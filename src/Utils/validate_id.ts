const validateId = (id: any) => {
    console.log(id);
    const myid = parseInt(id);
    if (typeof myid === 'number' && Number.isFinite(myid) && Number.isInteger(myid)) {
        console.log(`type of myid(${myid}) :`, typeof myid);
        return { isValid: true, response: null };
    } else if (typeof id === "string") {
        console.log(`type of id(${id}) :`, typeof id);
        throw new Error("Invalid ID. ID must be a pure numeric value.");
    } else {
        throw new Error("Invalid ID. ID must be a pure numeric value.");
    }
};

export default validateId;
