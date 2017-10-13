//http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80783ned&D1=4&D2=1-8&D3=0&D4=l&HDR=G2,G3&STB=T,G1&VW=T


//selecteert het svg element in de html
var svg = d3.select("svg"),
	//maakt de marign waardes aan
	margin = {
		top: 20,
		right: 20,
		bottom: 90,
		left: 90
	},
	//stelt de het formaat van de grafiek aan dmv de margins en de grote van het svg "canvas"
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
	y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Load in the tsv file with data
d3
	.text('data.csv')
	.get(onload)

function onload(err, doc) {
	if (err) throw err;

	var header = doc.indexOf('"Bedrijfstypen";"Perioden";"aantal"')
	var end = doc.indexOf('\n', header)

	doc = doc.slice(end).trim()

	var data = d3.csvParseRows(doc, map)
	data.pop(1) // removes last item from the

	function map(d) {
		return {
			type: d[0], // create type based on the "Bedrijfstypen" column
			value: d[2] // set value based on the "aantal" column
		}
	}

	//Define X and Y axis based on the values from the dataset
	x.domain(data.map(function(d) {
		return d.type;
	}));
	y.domain([
		0,
		d3.max(data, function(d) {
			return d.value;
		})
	]);

	//A svg group is made for te X axis
	g.append("g").attr("class", "axis axis--x").attr("transform", "translate(1," + height + ")").call(d3.axisBottom(x));

	//A svg group is made for te X axis
	g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(16)).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text("value");

	//The bars for the graph are defined
	g.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
		return x(d.type);
	}).attr("y", function(d) {
		return y(d.value);
	})
	//The bars get a random fill with every reload
		.attr("fill", "#" + Math.floor(Math.random() * 999999)).attr("width", x.bandwidth()).attr("height", function(d) {
		return height - y(d.value);
	});

	//when the check changes its state it triggers the onchange function
	d3.select("input").on("change", onChange);

	var sortTimeout = setTimeout(function() {
		d3.select("input").property("checked", false).each(onChange);
	}, 0);

	function onChange() {
		clearTimeout(sortTimeout);
		var x0 = x.domain(data.sort(this.checked
			// when checked data is sorted by value
			? function(a, b) {
				return b.value - a.value;
			}
			: function(a, b) {
				return d3.ascending(a.type, b.type);
			}).map(function(d) {
			return d.type;
		})).copy();


		svg.selectAll(".bar").sort(function(a, b) {
			return x0(a.type) - x0(b.type);
		});

		var transition = svg.transition().duration(750),
			delay = function(d, i) {
				return i * 0;
			};

		transition.selectAll(".bar").delay(delay).attr("x", function(d) {
			return x0(d.type);
		});

		// The types on the X axis are rearanged according to the sort value
		transition.select(".axis--x").call(d3.axisBottom(x)).selectAll("g").delay(delay);
	}
};
