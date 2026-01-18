# VueCharter

A tool for creating charts using Vue.

Generate bar, pie or line charts!

# Manual generation

Input your data, click 'generate chart', and if needed, click on 'download' to download a .png image of your chart.
If you want to create a new chart, delete the current one.

# File uploads

You can also generate a chart based on a data inside a .csv file. This generation assumes your file has two columns, and the first row consists of characters 'x' and 'y'

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


Invalid csv file :

```
Nadiya,69, 400, Washington
Joline,80, 192, Birmingham
Leisha,69, Dubai
Alli,39, Stockholm
Hewett,43, London
Devan,52, New York
```
- more than two columns
- lack of headers (will result in a malformed chart)
