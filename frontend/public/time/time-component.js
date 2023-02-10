const template = document.createElement('template');
template.innerHTML = `
<svg width="8vh" height="8vh" viewBox="0 0 800 800" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<circle cx="400" cy="400" r="400" fill="#fff"/>
	<use transform="matrix(-1,0,0,1,800,0)" xlink:href="#c"/>
	<g id="c">
		<g id="d">
			<path d="m400 40v107" stroke="#000" stroke-width="26.7"/>
			<g id="a">
				<path d="m580 88.233-42.5 73.612" stroke="#000" stroke-width="26.7"/>
				<g id="e">
					<path id="b" d="m437.63 41.974-3.6585 34.808" stroke="#000" stroke-width="13.6"/>
					<use transform="rotate(6 400 400)" xlink:href="#b"/>
				</g>
				<use transform="rotate(12 400 400)" xlink:href="#e"/>
			</g>
			<use transform="rotate(30 400 400)" xlink:href="#a"/>
			<use transform="rotate(60 400 400)" xlink:href="#a"/>
		</g>
		<use transform="rotate(90 400 400)" xlink:href="#d"/>
	</g>
	<path id="hour" d="m334.31 357.65-12.068 33.669 283.94 100.8 23.565-10.394-13.332-24.325z"/>
	<path id="minute" d="m480.73 344.98 11.019 21.459-382.37 199.37-18.243-7.2122 4.768-19.029z"/>
	<path id="second" d="m410.21 301.98-43.314 242.68a41.963 41.963 0 0 0-2.8605-0.091 41.963 41.963 0 0 0-41.865 42.059 41.963 41.963 0 0 0 30.073 40.144l-18.417 103.18 1.9709 3.9629 3.2997-2.9496 21.156-102.65a41.963 41.963 0 0 0 3.9771 0.1799 41.963 41.963 0 0 0 41.865-42.059 41.963 41.963 0 0 0-29.003-39.815l49.762-241.44zm-42.448 265.56a19.336 19.336 0 0 1 15.703 18.948 19.336 19.336 0 0 1-19.291 19.38 19.336 19.336 0 0 1-19.38-19.291 19.336 19.336 0 0 1 19.291-19.38 19.336 19.336 0 0 1 3.6752 0.3426z" fill="#a40000"/>
</svg>

`;


class TimeComponent extends HTMLElement{

    timer = null;
    timeZone = "Europe/Vienna"; // default

    constructor() {
        super()
        console.log("constructor parent component()")
        this.initComponent();
    }

    static get observedAttributes() {
        return ['time-attribute', 'timezone-attribute'];
    }

    setStyle(){
        const link = document.createElement("link")
        link.setAttribute("href", "http://fonts.cdnfonts.com/css/led-digital-7")
        link.setAttribute("rel","stylesheet")
        document.head.appendChild(link)

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        style.textContent = '.d-flex {\n' +
            '  display: flex;\n' +
            '}\n' +
            '\n' +
            '.flex-column {\n' +
            '  flex-direction: column;\n' +
            "  width: 200px;\n" +
            '}\n' +
            '\n' +
            '.align-items-end {\n' +
            '      align-items: end;\n' +
            '}\n' +
            '.align-items-center {\n' +
            '      align-items: center;\n' +
            '}\n' +
            ".box-div {\n" +
            "  background-color: white;\n" +
            "  \n" +
            "  padding: 5px;\n" +
            "  \n" +
            "  text-align: center;\n" +
            "  border: 3px solid black;\n" +
            "  color: black;\n" +
            "  font-family: \"Segoe UI\",Arial,sans-serif;\n" +
            "  @import url('http://fonts.cdnfonts.com/css/led-digital-7');\n" +
            "  font-family: 'Arial, sans-serif;\n" +
            "}\n" +
            ".digit {" +
            "  font-family: 'LED Digital 7', sans-serif;\n" +
            "  \n" +
            "}"
        this.shadowRoot.appendChild(style)
    }

    initComponent(){
        //debugger

        const root = document.createElement("div")
        root.setAttribute("class", "d-flex flex-column align-items-end")
        this.attachShadow({mode: 'open'})

        const svg = template.content.cloneNode(true)
        
        root.appendChild(svg)

        
        this.shadowRoot.appendChild(root)
        // after setting elements set a style element to shadowRoot
        this.setStyle()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //debugger
        if (name == 'time-attribute' && this.shadowRoot != null) {
            this.changeTime(newValue)
        }
        if (name == 'timezone-attribute' && this.shadowRoot != null) {
            this.timeZone = newValue
            this.changeTime(Math.round((new Date()).getTime() / 1000))
        }
    }

    changeTime(value) {
        let date = new Date(value * 1000);

        date = new Date(date.toLocaleString('en-US', {
            timeZone: this.timeZone
        }));


        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        /*  offset for wrong hour is +250 degrees hour
            offset for wrong minute is +117 degrees
            offset for wrong seconde is +168 degrees */

        let hour = (360.0/12.0*(hours%12+minutes/60.0))+250;
        let minute = (360/60*(minutes%60))+117;
        let second = (360.0/60*(seconds%60.0))+168;

        this.shadowRoot.getElementById("hour").setAttribute("transform", "rotate("+hour+",400,400)");
        this.shadowRoot.getElementById("minute").setAttribute("transform", "rotate("+minute+",400,400)");
        this.shadowRoot.getElementById("second").setAttribute("transform", "rotate("+second+",400,400)");
        //debugger
        if (this.timer == null){
            this.timer = setInterval(() => {
                this.changeTime(Math.round((new Date()).getTime() / 1000))
            }, 200)
        }
    }

}

customElements.define("time-component", TimeComponent)