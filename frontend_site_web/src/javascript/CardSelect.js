function normalize(val, max, min) {
    if (max - min === 0) return 0;
    return (val - min) / (max - min);
}

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

class CardSelect extends HTMLElement {
    static get observedAttributes() {
        return ['width', 'height', 'callback', 'message'];
    }

    constructor() {
        super();
        this.isSwiping = false;
        this.isOk = false;
        this.attachShadow({ mode: 'open' });
        this.container = null;
        this.cardContainer = null;
        this.card = null;
        this.childrens = []
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
          <style>
            #card-select-main-container {
              width: ${this.width || "100%"};
              height: ${this.height || "100%"};
            }

          </style>
          <section id="card-select-main-container" >
            <slot></slot>
          </section>
        `;

        // this.observer = new MutationObserver(() => this.childrenChanged());
        // this.observer.observe(this, { childList: true });

        this.container = this.shadowRoot.getElementById("card-select-main-container")


        this.shadowRoot.addEventListener("mousedown", (e) => {
            this.isSwiping = true;
            this.cardContainer = e.target.shadowRoot.querySelector("#card-select-container")
            this.card = e.target.shadowRoot.querySelector("#card-select-input")
        });

        this.shadowRoot.addEventListener('mousemove', (e) => {
            if (this.isSwiping && e.target.shadowRoot) {
                const value = (e.view.innerWidth - e.clientX) - (e.view.innerWidth / 2)
                const perc = normalize(Math.abs(value), 200, 0)

                if (value > 0) {
                    // left
                    this.container.style.backgroundColor = `rgba(255,150,150,${perc})`
                    this.card.style.transform = "rotate(-15deg)"

                    this.isOk = false
                }

                if (value < 0) {
                    // right
                    this.container.style.backgroundColor = `rgba(50,255,150,${perc})`
                    this.card.style.transform = "rotate(15deg)"

                    this.isOk = true
                }

                this.cardContainer.style.left = (e.clientX - 50) + "px"
                this.cardContainer.style.top = (e.clientY - 50) + "px"
            }
        });

        this.shadowRoot.addEventListener('mouseup', (e) => {
            const value = (e.view.innerWidth - e.clientX) - (e.view.innerWidth / 2)
            if (value < 80 && value > -80) {
                return
            }

            if (this.isSwiping) {
                this.isSwiping = false;
                if (this.isOk) {
                    this.onSwipeRight()
                } else {
                    this.onSwipeLeft()
                }
                this.removeChild(e.target)
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }

    onSwipeRight() {
        this.dispatchEvent(new CustomEvent('onSwipeRight'));
    }

    onSwipeLeft() {
        this.dispatchEvent(new CustomEvent('onSwipeLeft'));
    }

    // childrenChanged() {
    //     console.log('Les enfants de l\'élément ont été modifiés !');
    //     this.childrens = (Array.from(this.children))
    // }
}

class CardSelectItem extends HTMLElement {
    static get observedAttributes() {
        return ['width', 'height'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {

        this.shadowRoot.innerHTML = `
        <style>
            #card-select-container {
                position: absolute;
                top: calc(50% - (${this.height || "200px"}/2));
                left: calc(50% - (${this.width || "100px"}/2));
                width: ${this.width || "100px"};
                height: ${this.height || "200px"};
            }
            
            #card-select-input {
                box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.13);
                background-color: white;
                width: ${this.width || "100px"};
                height: ${this.height || "200px"};
                transition: 0.2s ease;
                border-radius: 8px;
            }

        </style>
        <div id="card-select-container" >
            <div id="card-select-input" >
                <slot></slot>
            </div>
        </div>
        `

        this.cardContainer = this.shadowRoot.getElementById("card-select-container")
        this.card = this.shadowRoot.getElementById("card-select-input")
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {

            this[name] = newValue;
        }
    }
}


customElements.define('card-select', CardSelect);
customElements.define('card-select-item', CardSelectItem);



