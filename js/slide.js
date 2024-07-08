export class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.distancias = {
            finalPosition: 0,
            startX: 0,
            movement: 0
        }
    }

    onStart(event) {
        let movetype;
        if (event.type === 'mousedown') {
            event.preventDefault();
            this.distancias.startX = event.clientX;
            movetype = 'mousemove';
        } else {
            this.distancias.startX = event.changedTouches[0].clientX;
            movetype = 'touchmove';
        }
        this.wrapper.addEventListener(movetype, this.onMove);
    }

    updatePosition(clientX) {
        this.distancias.movement = (this.distancias.startX - clientX) * 1.5;
        return this.distancias.finalPosition - this.distancias.movement;
    }

    onMove(event) {
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition);
        this.moveSlide(finalPosition);
    }

    moveSlide(distanciaX) {
        this.distancias.movePosition = distanciaX;
        this.slide.style.transform = `translate3d(${distanciaX}px, 0, 0)`;
    }

    onEnd() {
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(movetype, this.onMove);
        this.distancias.finalPosition = this.distancias.movePosition;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }

    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    slidePosition(slide) {
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }

    // Slides config

    slidesConfig() {
        this.slideArray = [...this.slide.children].map((element) => {
            const position = this.slidePosition(element);
            return {
                position,
                element
            }
        });
    }

    slidesIndexNav(index) {
        const lastIndex = this.slideArray.length - 1;
        console.log(lastIndex);
        this.index = {
            prev: index ? index - 1 : undefined,
            active: index,
            next: index === lastIndex ? undefined : index + 1,
        }
    }

    changeSlide(index) {
        const activeSlide = this.slideArray[index];
        this.moveSlide(activeSlide.position);
        this.slidesIndexNav(index);
        this.distancias.finalPosition = activeSlide.position;
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        this.slidesConfig();
        return this;
    }
}
