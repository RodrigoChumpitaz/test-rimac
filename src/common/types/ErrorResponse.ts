interface errorParameters{
    name: string;
    message: string;
    stackTrace: string | undefined;
}

export class ErrorResponse{
    public name!: string;
    public message!: string;
    public stackTrace!: string;

    constructor(parameters: errorParameters){
        Object.assign(this, parameters);
        if(parameters.stackTrace){
            this.stackTrace = parameters.stackTrace;
        }
    }

    public static fromError(error: Error): ErrorResponse{
        return new ErrorResponse({
            name: error.name,
            message: error.message,
            stackTrace: error.stack?.toString(),
        });
    }

    public toJSON(): string{
        return JSON.stringify(this);
    }

}

