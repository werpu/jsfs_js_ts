export class FakeWebsocket {

    onopen: Function = () => {}
    onmessage: Function = () => {}
    onclose: Function = () => {}

    constructor(data?: any) {
        setTimeout(() => {
            this.onopen();
        }, 10);
    }


    send(msg: any) {
    }

    _respond(response: any) {
        this.onmessage(response);
    }

    close() {
        this.onclose();
    }
}