const form = document.querySelector("form");
const ul = document.getElementById("students");
const supp =document.getElementById("supp");
const student_nuber = document.getElementById('student_nuber');
const random_nuber = document.getElementById('random_nuber');
const msg = document.getElementById('msg')
const msg_random = document.getElementById('msg_random')
const tirage = document.getElementById('tirage')
const reset = document.getElementById('reset')
var lst_students = [];
var lst_random = [];
var student_count = 0;
var random_count = 0;

function add_tolist(student){
    var student_a=student
    if(lst_students.includes(student_a)){
        alert("Etudiant déja dans la list");
        
    }else{
        lst_students.push(student_a)
        lst_random.push(student_a)
        const li = document.createElement("label");
        const quit=document.createElement("button");
        const br=document.createElement('br');
        li.innerHTML=`<label for="${student_a}"><label>`
        quit.textContent="X";
        quit.classList.add("X");
        quit.style.padding="3px";
        quit.style.paddingBottom="1px";
        quit.style.paddingTop="1px";
        quit.style.marginLeft="5px"
        li.textContent=student_a;
        li.appendChild(quit);
        li.appendChild(br);
        li.style.display="flex";
        ul.appendChild(li);
        erreur.style.display='none';
        random_count++;
        random_nuber.textContent=random_count;
        if (random_count == 1){
            msg_random.textContent=`Nombre d'étudiant non selectioner restant :`
            msg_random.style.border="hidden, 0px"
            msg_random.style.borderRadius="0px"
        }else{
            msg_random.textContent=`Nombres d'étudiants non selectioner  restant :`
            msg_random.style.border="hidden, 0px"
            msg_random.style.borderRadius="0px"
        }
        student_count++;
        student_nuber.textContent=student_count;
        if (student_count == 1){
            msg.textContent=`Nombre d'étudiant :`
            msg.style.border="hidden, 0px"
            msg.style.borderRadius="0px"
        }else{
            msg.textContent=`Nombres d'étudiant :`
            msg.style.border="solid, 1px"
            msg.style.borderRadius="3px"
            student_nuber.textContent="";
        }
        localStorage.setItem("random", lst_random)
        localStorage.setItem("students", lst_students)
        quit.addEventListener('click', function(){
            if(lst_random.includes(student_a)){
                lst_random.splice(lst_random.indexOf(student_a),1)
                random_count-=1;
                random_nuber.textContent=random_count;
                if (random_count == 1){
                    msg_random.textContent=`Nombre d'étudiant non selectioner  restant :`
                    msg_random.style.border="hidden, 0px"
                    msg_random.style.borderRadius="0px"
                }else if (random_count == 0){
                    msg_random.textContent=`Tout les Etudiant de la list on été tirer`
                    msg_random.style.border="solid, 1px"
                    msg_random.style.borderRadius="3px"
                    random_nuber.textContent="";
                }else {
                    msg_random.textContent=`Nombres d'étudiants non selectioner restant :`
                    msg_random.style.border="hidden, 0px"
                    msg_random.style.borderRadius="0px"
                }
            }
            student_count-=1;
            student_nuber.textContent=student_count;
            if (student_count == 1){
                msg.textContent=`Nombre d'étudiant :`
                msg.style.border="hidden, 0px"
                msg.style.borderRadius="0px"
            }else if (student_count == 0){
                msg.textContent=`Pas d'étudiant dans la liste`
                msg.style.border="solid, 1px"
                msg.style.borderRadius="3px"
                student_nuber.textContent="";
            }else {
                msg.textContent=`Nombres d'étudiants :`
                msg.style.border="hidden, 0px"
                msg.style.borderRadius="0px"
            }
            ul.removeChild(li);
            erreur.style.display='none';
            lst_students.splice(lst_students.indexOf(student_a),1)
            localStorage.setItem("random", lst_random)
            localStorage.setItem("students", lst_students)
        });
        document.getElementById("nom").value = "";
        document.getElementById("prenom").value = "";
    }
};

function storage(){
    lst_stud=localStorage.getItem("students")
    if(!lst_stud==""){
        lst_stud=lst_stud.split(",")
    }
    console.log(lst_stud)
    for (i = 0; i < lst_stud.length; i++){
        console.log(lst_stud[i])
        add_tolist(lst_stud[i])
    }
}

function main(){
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = form.nom.value.trim();
        const prenom = form.prenom.value.trim();
        console.log(nom+" "+prenom)
        if (!nom=="" && !prenom==""){
            add_tolist(nom+" "+prenom);
        }else{
            erreur.style.display='block';
        };
    });

    supp.addEventListener("click", function(){
        ul.innerHTML="";
        erreur.style.display='none';
        random_count = 0;
        msg_random.textContent=`Tout les Etudiant de la list on été tirer`
        msg_random.style.border="solid, 1px"
        msg_random.style.borderRadius="3px"
        random_nuber.textContent="";
        lst_students = [];
        lst_random = [];
        student_count-=1;
        msg.textContent=`Pas d'étudiant dans la liste`
        msg.style.border="solid, 1px"
        msg.style.borderRadius="3px"
        student_nuber.textContent="";
        localStorage.setItem("random", lst_random)
        localStorage.setItem("students", lst_students)
    });

    tirage.addEventListener("click", function(){
        if (lst_random.length==0){
            alert("Tout les etudiant on été tirer au sort")
        }else{

            var index=Math.floor(Math.random() * lst_random.length)
            alert("Etudiant : "+lst_random[index])
            lst_random.splice(index,1)
            random_count=lst_random.length;
            random_nuber.textContent=random_count;
            if (random_count == 1){
                msg_random.innerHTML=`Nombre d'étudiant non selectioner  restant :`
                msg_random.style.border="hidden, 0px"
                msg_random.style.borderRadius="0px"
            }else if (random_count == 0){
                msg_random.innerHTML=`Tout les Etudiant de la list on été tirer`
                msg_random.style.border="solid, 1px"
                msg_random.style.borderRadius="3px"
                random_nuber.innerHTML="";
            }else {
                msg_random.innerHTML=`Nombres d'étudiants non selectioner  restant :`
                msg_random.style.border="hidden, 0px"
                msg_random.style.borderRadius="0px"
            }
        }
        localStorage.setItem("random", lst_random)
        localStorage.setItem("students", lst_students)

    });
    reset.addEventListener("click", function(){
        console.log(lst_students.copyWithin())
        for (i = 0; i < lst_students.length; i++) {
            lst_random[i] = lst_students[i];
          }
        random_count=lst_random.length;
        random_nuber.textContent=random_count;
        if (random_count == 1){
            msg_random.innerHTML=`Nombre d'étudiant restant :`
            msg_random.style.border="hidden, 0px"
            msg_random.style.borderRadius="0px"
        }else if (random_count == 0){
            msg_random.innerHTML=`Tout les Etudiant de la list on été tirer`
            msg_random.style.border="solid, 1px"
            msg_random.style.borderRadius="3px"
            random_nuber.innerHTML="";
        }else {
            msg_random.innerHTML=`Nombres d'étudiants restant :`
            msg_random.style.border="hidden, 0px"
            msg_random.style.borderRadius="0px"
        }
        localStorage.setItem("random", lst_random)
        localStorage.setItem("students", lst_students)

    });
    storage()
    localStorage.setItem("random", lst_random)
    localStorage.setItem("students", lst_students)
};

main();