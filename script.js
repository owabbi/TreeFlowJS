var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var modal = document.getElementById("FlowModal");
canvas.addEventListener("click", ClickEvent);

var AddCircleBtn = document.getElementById("addCircle");
var StopAddCircleBtn = document.getElementById("stopAddCircle");

var AddSegmentBtn = document.getElementById("addSegment");
var StopAddSegmentBtn = document.getElementById("stopAddSegment");

var flows = [];
var particles = [];

var segments = [];

var AddCircleFlag = false;
var MovingParticleFlag = false;

var AddSegmentFlag = false;
var StillDrawingSegment = false;

var EditFlowFlag = false;

var SelectedFlow;
var SelectedFlowIndex = 0;

function Start() {
    setInterval(updateArea, 20);
    StopAddCircleBtn.style.display = "none";
    StopAddSegmentBtn.style.display = "none";

    var DefaultColor = "yellow";
    var DefaultName = "Default";
    var DefaultFlow = new Flow(DefaultColor, DefaultName);

    var Element = document.getElementById("Element1");
    var ElementName = document.getElementById("NameElement1");
    var ElementIcon = document.getElementById("IconElement1");

    Element.style.display = "flex";
    Element.style.backgroundColor = "silver";
    ElementName.innerHTML = DefaultName;
    ElementIcon.style.backgroundColor = DefaultColor;

    flows.push(DefaultFlow);
    console.table(flows);

    SelectedFlow = DefaultFlow;

}

function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

class Flow {
    constructor(color, name) {
        this.particles = [];
        this.color = color;
        this.name = name;
    }
}

function getCurrentFlow(element) {
    return flows[element];
}

class Particle {
    constructor(positionX, positionY) {
        this.posX = positionX;
        this.posY = positionY;
        this.color = SelectedFlow.color;
        this.radius = 20;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function EnableAddCircle() {
    AddCircleFlag = true;
    AddCircleBtn.style.display = "none";
    StopAddCircleBtn.style.display = "block";
    DisableDrawSegment();
}

function DisableAddCircle() {
    AddCircleFlag = false;
    AddCircleBtn.style.display = "block";
    StopAddCircleBtn.style.display = "none";
}

function EnableDrawSegment() {
    AddSegmentFlag = true;
    AddSegmentBtn.style.display = "none";
    StopAddSegmentBtn.style.display = "block";
    DisableAddCircle();
}

function DisableDrawSegment() {
    AddSegmentFlag = false;
    AddSegmentBtn.style.display = "block";
    StopAddSegmentBtn.style.display = "none";
}

function OpenFlowModal() {
    modal.style.display = "block";
}

function CloseFlowModal() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function ParticleClicked(event, x, y, width) {
    var CurrentX = event.clientX;
    var CurrentY = event.clientY;
    if ((CurrentX < x + width) && (CurrentX > x - width)) {
        if ((CurrentY < y + width) && (CurrentY > y - width)) {
            console.log("Clicked");
            return true;
        }
    }
}

function NoSuperposed(event, x, y, width) {
    var CurrentX = event.clientX;
    var CurrentY = event.clientY;

    var dx = CurrentX - x;
    var dy = CurrentY - y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 2 * width) {
        console.log("Collision");
        return true;
    }
}

class Segment {
    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = SelectedFlow.color;
        this.width = 5;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
    }
}

var StartX = 0;
var StartY = 0;

function ClickEvent(event) {
    var x = event.clientX;
    var y = event.clientY;
    if (AddCircleFlag) {
        var NewParticle = new Particle(x, y);
        if (particles.length >= 1) {
            for (let index = 0; index < particles.length; index++) {
                const element = particles[index];
                var test = NoSuperposed(event, element.posX, element.posY, element.radius);
                if (test == true) {
                    return;
                }
            }
        }
        particles.push(NewParticle);
        console.table(particles);
    }

    if (AddSegmentFlag) {
        for (let index = 0; index < particles.length; index++) {
            const element = particles[index];
            if (ParticleClicked(event, element.posX, element.posY, element.radius)) {
                if (StillDrawingSegment == false) {
                    StartX = element.posX;
                    StartY = element.posY;
                    StillDrawingSegment = true;
                } else {
                    var NewSegment = new Segment(StartX, StartY, element.posX, element.posY);
                    segments.push(NewSegment);
                    StillDrawingSegment = false;
                    StartX = 0;
                    StartY = 0;
                }
            }
        }

    }
}


function updateArea() {
    Clear();
    for (let index = 0; index < segments.length; index++) {
        const element = segments[index];
        element.draw();
    }
    for (let index = 0; index < particles.length; index++) {
        const element = particles[index];
        element.draw();
    }

}

function GetCorrectElement(Id) {
    var Element;
    switch (Id) {
        case 1:
            Element = "Element1";
            break;
        case 2:
            Element = "Element2";
            break;
        case 3:
            Element = "Element3";
            break;
        case 4:
            Element = "Element4";
            break;
        case 5:
            Element = "Element5";
            break;
        default:
            break;
    }
    return Element;
}

function GetNameElement(Id) {
    var Element;
    switch (Id) {
        case 1:
            Element = "NameElement1";
            break;
        case 2:
            Element = "NameElement2";
            break;
        case 3:
            Element = "NameElement3";
            break;
        case 4:
            Element = "NameElement4";
            break;
        case 5:
            Element = "NameElement5";
            break;
        default:
            break;
    }
    return Element;
}

function GetIconElemnt(Id) {
    var Element;
    switch (Id) {
        case 1:
            Element = "IconElement1";
            break;
        case 2:
            Element = "IconElement2";
            break;
        case 3:
            Element = "IconElement3";
            break;
        case 4:
            Element = "IconElement4";
            break;
        case 5:
            Element = "IconElement5";
            break;
        default:
            break;
    }
    return Element;
}


function AddFlow() {
    var RedValue = document.getElementById("RedColor").value;
    var GreenValue = document.getElementById("GreenColor").value;
    var BlueValue = document.getElementById("BlueColor").value;
    var FlowName = document.getElementById("FlowName").value;
    var Color = "rgb(" + RedValue + ", " + GreenValue + ", " + BlueValue + ")";

    if (EditFlowFlag == false) {
        var NewFlow = new Flow(Color, FlowName);
        flows.push(NewFlow);
        var Element = document.getElementById(GetCorrectElement(flows.length));
        var ElementName = document.getElementById(GetNameElement(flows.length));
        var ElementIcon = document.getElementById(GetIconElemnt(flows.length));

        Element.style.display = "flex";
        ElementName.innerHTML = FlowName;
        ElementIcon.style.backgroundColor = Color;

        if (flows.length == 5) {
            var AddElement = document.getElementById("ElementAdd");
            AddElement.style.display = "none";
        }
    } else {
        var Element = document.getElementById(GetCorrectElement(SelectedFlowIndex + 1));
        var ElementName = document.getElementById(GetNameElement(SelectedFlowIndex + 1));
        var ElementIcon = document.getElementById(GetIconElemnt(SelectedFlowIndex + 1));

        Element.style.display = "flex";
        ElementName.innerHTML = FlowName;
        ElementIcon.style.backgroundColor = Color;

        var FlowElement = flows[SelectedFlowIndex];
        FlowElement.color = Color;
        FlowElement.name = FlowName;

        console.log(FlowElement);
    }
    console.table(flows);
    CloseFlowModal();
}


function SwitchFlow(index) {
    console.log(SelectedFlow);
    console.log(SelectedFlowIndex);
    var Element = document.getElementById(GetCorrectElement(index + 1));
    var PreviousElement = document.getElementById(GetCorrectElement(SelectedFlowIndex + 1));
    Element.style.backgroundColor = "silver";
    PreviousElement.style.backgroundColor = "white";
    SelectedFlowIndex = index;
    SelectedFlow = flows[index];

    console.log(SelectedFlowIndex);
    console.log(SelectedFlow);
}

function EditFlow(element) {
    EditFlowFlag = true;
    OpenFlowModal();

}

function DeleteFlow(element) {
    console.table(flows);
    console.log("Delete n°" + element);
    var Element = document.getElementById(GetCorrectElement(element));
    Element.style.display = "none";
    SelectedFlowIndex = 0;
    delete flows[element - 1];
    console.table(flows);
}