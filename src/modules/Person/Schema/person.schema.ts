export interface IPerson{
    personId: string;
    name: string;
    lastName: string;
    age: number | string;
}

export interface IPersonInsert{
    name: string;
    lastName: string;
    age: number | string;
}