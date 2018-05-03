interface Person{
    firstname:string,
    lastname:string
}
function greeter(person:Person):string {
    return "Hello, " + person.firstname + person.lastname;
}

let user = {firstname:'li',lastname:'lei'};
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
document.body.innerHTML = greeter(user);