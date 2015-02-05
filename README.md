# canvsChart

## Author: Jinhong Fan

##Description:
Today, I would like to talk about this *CanvasChart* project. 
This project is showing how to use the **<canvas>**tag to draw a 2d chart using the Json data.

##Instructions:
At frist, what I need to do is fetch the data and then using the data to draw a chart. I use Ajax call the data from Json and then
set a for loop to comply the data in order. 
Secondly, I create two functions called *showbar* and *showpie* and then call them and active that.
What is in *showbar* and *showpie* my function? I set a deflut parameters as function and then I can reuse it again in both functions.
I create a varable that is ** var canvas = document.querySelector("#Bars"); context = canvas.getContext("2d");**.
I set a color stylefill from the json data by a for loop function in piechart function. Next,I set the context.arc for the angle and the text.
Finally, call the function.



