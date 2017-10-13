# Assessment 2
This is my design masterpiece to visualise the amount of agricultural businesses per type of business in the Netherlands in 2016


## Background
I used a [dataset] by the CBS which i had to remove the header and footer from and convert to a usable dataset.
```
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
```
for the interaction i reused the interaction assignment from class 4 to sort the data by amount of businesses.


## Features

*	[d3-dsv](https://github.com/d3/d3-dsv) - parse tab-separated values
*	[d3-format](https://github.com/d3/d3-format) - number formatting
*	[d3-scale](https://github.com/d3/d3-scale) - position encodings
*	[d3-array](https://github.com/d3/d3-array) - data processing
*	[d3-axis](https://github.com/d3/d3-axis) - axis
*	[d3-transition](https://github.com/d3/d3-transition) - transitions
*	[d3-ease](https://github.com/d3/d3-ease) - d3 ease for transitions
*	[Sorting](https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/sort) - sorting data


## License

Based of the original barchart from mbostock but with different data and functionality.
[Original]

[Background]

[dataset]


[Background]: https://www.toptal.com/designers/subtlepatterns/worms/
[Original]: https://bl.ocks.org/mbostock/3885304
[dataset]: http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80783ned&D1=4&D2=1-8&D3=0&D4=l&HDR=G2,G3&STB=T,G1&VW=T
