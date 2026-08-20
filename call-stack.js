function A() {
    console.log('A mulai')
    B()
    console.log('A selesai')
}

function B() {
    console.log('B mulai')
    C()
    console.log('B selesai')
}

function C() {
    console.log('C')
}

A()