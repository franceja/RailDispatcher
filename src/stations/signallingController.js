
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttributeNS(null ,key, attrs[key]);
    }
}

function setSignalStructure(id,x,y,light,direction,type){
    
    var xml = "http://www.w3.org/2000/svg";
    var svg = document.getElementsByTagName('svg')[0];
    var react = document.createElementNS(xml, 'rect');

    var circle = {1: document.createElementNS(xml, 'circle'), 2: document.createElementNS(xml, 'circle'), 3: document.createElementNS(xml, 'circle')};
    var path = {1: document.createElementNS(xml, 'path'), 2: document.createElementNS(xml, 'path')};

    var text = document.createElementNS(xml, 'text')
    if (type==3){
        setAttributes(react, {"x": x-8, "y": y-7, "id": id+"-react", "width":36, "height": 15, "fill": "grey", "rx":5});
        setAttributes(circle[1], {"cx": x, "cy": y, "id": id+"-circle1", "r":5, "fill": light[1]});
        setAttributes(circle[2], {"cx": x+10, "cy": y, "id": id+"-circle2", "r":5, "fill": light[2]});
        setAttributes(circle[3], {"cx": x+20, "cy": y, "id": id+"-circle3", "r":5, "fill": light[3]});

        if (direction==1){
            setAttributes(path[1], {"d":"M "+(x+35)+" "+y+" L "+(x+28)+" "+y, "stroke-width":"3", "stroke":"grey"});
            setAttributes(path[2], {"d":"M "+(x+35)+" "+(y+5)+" L "+(x+35)+" "+(y-5), "stroke-width":"3", "stroke":"grey"});
            setAttributes(text, {"x": x+45, "y": y+5, "fill":"cyan"});
        } else {
            setAttributes(path[1], {"d":"M "+(x-14)+" "+y+" L "+(x-8)+" "+y, "stroke-width":"3", "stroke":"grey"});
            setAttributes(path[2], {"d":"M "+(x-14)+" "+(y-5)+" L "+(x-14)+" "+(y+5), "stroke-width":"3", "stroke":"grey"});
            setAttributes(text, {"x": x-45, "y": y+5, "fill":"cyan"});
        }
    } 
    if (type==2) {
        setAttributes(react, {"x": x-8, "y": y-7, "id": id+"-react", "width":26, "height": 15, "fill": "grey", "rx":5});
        setAttributes(circle[1], {"cx": x, "cy": y, "id": id+"-circle1", "r":5, "fill": light[1]});
        setAttributes(circle[2], {"cx": x+10, "cy": y, "id": id+"-circle2", "r":5, "fill": light[3]});

        if (direction==1){
            setAttributes(path[1], {"d":"M "+(x+25)+" "+y+" L "+(x+15)+" "+y, "stroke-width":"3", "stroke":"grey"});
            setAttributes(path[2], {"d":"M "+(x+25)+" "+(y+5)+" L "+(x+25)+" "+(y-5), "stroke-width":"3", "stroke":"grey"});
            setAttributes(text, {"x": x+35, "y": y+5, "fill":"cyan"});
        } else {
            setAttributes(path[1], {"d":"M "+(x-14)+" "+y+" L "+(x-8)+" "+y, "stroke-width":"3", "stroke":"grey"});
            setAttributes(path[2], {"d":"M "+(x-14)+" "+(y-5)+" L "+(x-14)+" "+(y+5), "stroke-width":"3", "stroke":"grey"});
            setAttributes(text, {"x": x-45, "y": y+5, "fill":"cyan"});
        }
    }

    text.textContent=id;
    svg.appendChild(text);
    svg.appendChild(react);
    svg.appendChild(circle[1]);
    svg.appendChild(circle[2]);
    svg.appendChild(circle[3]);
    svg.appendChild(path[1]);
    svg.appendChild(path[2]);

}

function signal(id, x, y, status, direction=1, type=3){
    
    var light = {1: "black",2: "black",3: "black"};
    switch (status){
        case "green":
            if(direction==1)
                light[1] = "lime";
            else
                light[3] = "lime";
            break;
        case "yellow":
            light[2] = "yellow";
            break;
        case "red":
            if(direction==1)
                light[3] = "red";
            else
                light[1] = "red";
            break;
    }
    setSignalStructure(id,x,y,light,direction,type)
}
    