const saveButton = document.getElementById('save-button');
const getSex = () => {
    const s = form.elements.namedItem("sex").value;
    return s
}
const getWhatDo = () => {
    const w = form.elements.namedItem("show/delete").value;
    return w
}
const dark = document.getElementById('dark');

class Client {
    constructor(options) {
        let {
            name,
            sex,
            birthday,
            address,
            phone,
            email,
            id,
            visibility = true
        } = options;
        this.name = name;
        this.sex = sex;
        this.birthday = birthday;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.id = Date.now();
        this.visibility = visibility;
    }
    toggleVisibility() {
        this.visibility = !this.visibility;
    }
}

const renderClients = () => {
    const renderOneClient = (client) =>{
        if (client.visibility) {
        const table = document.getElementById('table');
        const clientTr = document.createElement('tr');
        clientTr.addEventListener('click', actionWithClinet.bind(clientTr, client.id));
        clientTr.innerHTML = 
        `
            <td class="td-client">${client.name}</td>
            <td class="td-client">${client.sex}</td>
            <td class="td-client">${client.birthday}</td>
            <td class="td-client">${client.address}</td>
            <td class="td-client">${client.phone}</td>
            <td class="td-client">${client.email}</td>
        `
        clientTr.id = client.id
        table.append(clientTr);
       }
    }
    const table = document.getElementById('table');
    table.innerHTML = "";
    listClient.forEach((client) => {
        renderOneClient(client);
    })
}

let listClient = [] 

const createClient = () => {
    const name = document.querySelector('#name').value;
    const birthday = document.querySelector('#birthday').value;
    const address = document.querySelector('#address').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value; 
 
    const client = new Client({
        name: name,
        sex: getSex(),
        birthday: birthday,
        address: address,
        phone: phone,
        email: email
    });
    console.log(client)
    return client
}

const addClient = (client) => {
    listClient.push(client)
    return listClient
}
const actionWithClinet = (id) => {
    if(getWhatDo() === 'show') {
        getActive(id);
    } else if (getWhatDo() === 'delete') {
        deleteClient(id);
    }
}

const getActive = (id) => {
    debugger;
    listClient.forEach((client) => {
        const table = document.getElementById('table');
        if( id !== client.id) {
            client.toggleVisibility()
        } else if (id == client.id) {
            return client
        } 
        renderClients()
    }) 
}

const deleteClient = (id) => {
    listClient = listClient.filter((client)=> client.id !== id);
    renderClients()
}

saveButton.addEventListener('click', () => {
    addClient(createClient());
    renderClients();
});

