# VueCharter

A tool for creating charts using Vue.

Generate bar, pie or line charts!

# Manual generation

Input your data, click 'generate chart', and if needed, click on 'download' to download a .png image of your chart.
If you want to create a new chart, delete the current one.

# File uploads

You can also generate a chart based on a data inside a .csv file.

The file should contain 2 or three columns : 'x' and 'y', corresponding to values on the chart, and an optional 'color' column, controlling the background color for a chart.
'x' expects a string, 'y' expects a string or number, 'color' expects a hex value. A file without a 'color' column is still valid, in that case the the chart will be single-color.

Valid csv file :

```
x,y 
Nadiya,69
Joline,80
Leisha,69
Alli,39
Hewett,43
Devan,52
```
- only two columns
- properly named headers


```
x,y, color
Nadiya,69, #3aeddf
Joline,80, #3be442
Leisha,69, #02feea
Alli,39, #01ddda
Hewett,43, #4040fe
Devan,52, #333333
```
- three columns, proper header names
- correct color values

Invalid csv file :

```
Nadiya,69, 400, #f5f5f5, Washington
Joline,80, 192, #f5f5f5, Birmingham
Leisha,69, Dubai
Alli,39, Stockholm
Hewett,43, London
Devan,52, New York
```
- more than three columns
- lack of headers (will result in a malformed chart)
