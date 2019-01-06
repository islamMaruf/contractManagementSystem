import '../styles/index.scss'
//Start Project with Axios
import axios from "axios";
const BASE_URL = "http://localhost:3000/contacts";
const TBody = document.querySelector('#tBody');
const submit = document.querySelector('#insert');
const editName = document.querySelector('#editName');
const editEmail = document.querySelector('#editEmail');
const editPhone = document.querySelector('#editPhone');
const update = document.querySelector('#update');
const updateModal = $('#editContract');
const nameCheck = document.querySelector('#name');
window.onload = function () {
    //get data from json server
    axios.get(BASE_URL)
        .then(res => {
            res.data.forEach((info)=>{
                createTdElement(info,TBody);
            });
        }).catch(err => console.log(err));
    //post data with  click event

    submit.addEventListener('click',()=>{
        if(nameCheck.value === ''){
            let div = document.querySelector('#nameCheck');
            let span = document.createElement('span');
            span.className = 'text-danger';
            span.innerHTML = '*name field cannot be empty';
            div.appendChild(span);

        }else{
            insertData();
        }


    })
};


function createTdElement(contract,parentElement){
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const tdName = document.createElement('td');
    const tdEmail = document.createElement('td');
    const tdPhone = document.createElement('td');
    const TR = document.createElement('tr');
    tdName.innerText = contract.name;
    TR.appendChild(tdName);
    tdEmail.innerText = contract.email ? contract.email : 'NA';
    TR.appendChild(tdEmail);
    tdPhone.innerText = contract.phone ? contract.phone :'NA';
    TR.appendChild(tdPhone);
    const tdAction = document.createElement('td');
    editBtn.className = 'btn btn-warning';
    editBtn.innerText = 'Edit';
    deleteBtn.className = 'btn btn-danger mx-2';
    deleteBtn.innerText = 'Delete';
    tdAction.appendChild(editBtn);
    tdAction.appendChild(deleteBtn);
    TR.appendChild(tdAction);
    parentElement.appendChild(TR);
    //delete data from the server
    deleteBtn.addEventListener('click',()=>{
        axios.delete(`${BASE_URL}/${contract.id}`)
            .then(res =>{
                parentElement.removeChild(TR);
            }).catch(err => console.log(err));
    });
    //edit data with modal and send the data in the server
    editBtn.addEventListener('click',()=>{

        updateModal.modal('toggle');
        editName.value = contract.name ;
        editEmail.value = contract.email ? contract.email : '';
        editPhone.value = contract.phone ? contract.phone : '';
    });

    update.addEventListener('click',()=>{
       let info = {
           name : editName.value,
           email: editEmail.value,
           phone:editPhone.value
       };
       //update data to the server
        axios.put(`${BASE_URL}/${contract.id}`,info)
            .then(res => {
                tdName.innerHTML = res.data.name;
                tdEmail.innerHTML = res.data.email ? res.data.email : NA;
                tdPhone.innerHTML = res.data.phone ? res.data.phone : NA;
                updateModal.modal('hide');


            })
            .catch(err => {
                console.log(err);
            });
    });


}


function  insertData() {
    let nameField = document.querySelector('#name');
    let emailField = document.querySelector('#email');
    let phoneField = document.querySelector('#phone');

    let information = {
        name : nameField.value,
        email : emailField.value,
        phone :phoneField.value
    };
    axios.post(BASE_URL,information)
        .then(res => {
            createTdElement(res.data,TBody);
            nameField.value = '';
            emailField.value = '';
            phoneField.value = '';
        })
        .catch(err=> console.log(err));

}

