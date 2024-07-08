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
        event.preventDefault();
        this.distancias.startX = event.clientX;
        this.wrapper.addEventListener('mousemove', this.onMove);
    }

    updatePosition(clientX) {
        this.distancias.movement = (this.distancias.startX - clientX) * 1.5;
        return this.distancias.finalPosition - this.distancias.movement;
    }

    onMove(event) {
        const finalPosition = this.updatePosition(event.clientX);
        this.moveSlide(finalPosition);
    }

    moveSlide(distanciaX) {
        this.distancias.movePosition = distanciaX;
        this.slide.style.transform = `translate3d(${distanciaX}px, 0, 0)`;
    }

    onEnd() {
        this.wrapper.removeEventListener('mousemove', this.onMove);
        this.distancias.finalPosition = this.distancias.movePosition;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
    }

    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        this.bindEvents();
        this.addSlideEvents();
        return this;
    }
}