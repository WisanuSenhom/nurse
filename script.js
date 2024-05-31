particlesJS("particles", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.8,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            onHover: {
                enable: true,
                mode: "push"
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}

window.addEventListener('scroll', function () {
    var scrollTopButton = document.querySelector('.scroll-top');
    if (this.window.pageYOffset > 200) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});


// ตรวจสอบข้อมูล เ

window.onload = function () {
    // เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
    checkLocalStorage();
};

async function checkLocalStorage() {
    // ตรวจสอบค่า uuid ใน local storage
    // var storedUUID = localStorage.getItem("userid");
    var storedDOCID = localStorage.getItem("docno1");

    // ถ้าค่า uuid ไม่มีหรือเป็นค่าว่าง
    if (!storedDOCID || storedDOCID.trim() === "") {
        // ไปหน้า login
        main();
    } else {

        let timerInterval;
        Swal.fire({
            title: "กำลังโหลดข้อมูล!",
            html: "I will close in <b></b> milliseconds.",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });


        var userid = localStorage.getItem("userid");
        var username = localStorage.getItem("name");

        // ข้อมูลส่วนบุคคล
        //รูป
        document.querySelector('#yourpic').src = localStorage.getItem("yourpic");
        //อักษร
        document.querySelector('#iname').innerText = localStorage.getItem("name") + " " + localStorage.getItem("job");

        document.querySelector('#imore').innerText = "ปฏิบัติงานที่ : " + localStorage.getItem("office") + " สังกัด " + localStorage.getItem("mainsub") + "\nเลขที่ใบประกอบ : " + localStorage.getItem("docno1") + "\nหมดอายุวันที่ : " + localStorage.getItem("expdate");


        const xurl = `https://script.google.com/macros/s/AKfycbzNOEtVw7sINayjzIRM7g1SZcmwEShXfcS993gkT63Zf5JjzE3sKtMVNtK1nQq8-TBR/exec?id=${userid}`;

        const records = await fetch(xurl);
        const data = await records.json();

        let tab = '';
        data.user.forEach(function (user) {

            tab += `<tr>
       <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.job}</td>
        <td>${user.work}</td>
        <td>${user.main}</td>
        <td>${user.sub}</td>
        <td>${user.docno1}</td>
        <td>${user.docno2}</td>
        <td>${user.docdate1}</td>
        <td>${user.docdate2}</td>
        <td>${user.docdate3}</td>
        <td>${user.tel}</td>   
        <td>${user.mail}</td> 
        <td>${user.note}</td>     
        <td>${user.dupdate}</td>     

         </tr>`
        });

        document.getElementById('tbody').innerHTML = tab;
        $('#userTable').DataTable({
            "data": data.user,
            "columns": [
                { "data": 'id' },
                { "data": 'name' },
                { "data": 'age' },
                { "data": 'job' },
                { "data": 'work' },
                { "data": 'main' },
                { "data": 'sub' },
                { "data": 'docno1' },
                { "data": 'docno2' },
                { "data": 'docdate1' },
                { "data": 'docdate2' },
                { "data": 'docdate3' },
                { "data": 'tel' },
                { "data": 'mail' },
                { "data": 'note' },
                { "data": 'dupdate' }
            ],
            "processing": true,
            "responsive": true,
            "order": [[5, 'asc'], [6, 'asc'], [4, 'asc']],
            "dom": 'lBfrtip',
            "lengthMenu": [[10, 30, 70, 100, 150, 200, -1], [10, 30, 70, 100, 150, 200, "ทั้งหมด"]],
            "buttons": [
                'excel', 'print',
                {
                    text: 'แก้ไข',
                    action: async function () {
                        var selectedRows = $('#userTable').DataTable().rows({ selected: true }).data();
        
                        if (selectedRows.length > 0) {
                            var selectData = selectedRows[0];
        
                            // Populate the form with the initial values
                            $('#editId').val(selectData.id);
                            $('#editName').val(selectData.name);
                            $('#editAge').val(selectData.age);
                            $('#editJob').val(selectData.job);
                            $('#editWork').val(selectData.work);
                            $('#editMain').val(selectData.main);
                            $('#editSub').val(selectData.sub);
                            $('#editDocno1').val(selectData.docno1);
                            $('#editDocno2').val(selectData.docno2);
                            $('#editDocdate1').val(selectData.docdate1);
                            $('#editDocdate2').val(selectData.docdate2);
                            $('#editDocdate3').val(selectData.docdate3);
                            $('#editTel').val(selectData.tel);
                            $('#editMail').val(selectData.mail);
                            $('#editNote').val(selectData.note);
                            $('#editDupdate').val(selectData.dupdate);
        
                            // Show the modal
                            $('#editModal').modal('show');
                            
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "No row selected!"
                            });
                        }
                    }
                }
            ],
            "pageLength": 100,
            "language": {
                "url": 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json'
            },
            "select": true
        });
        
        // Save changes handler
        $('#saveChanges').on('click', function() {
            var formData = $('#editForm').serializeArray();
            var updatedData = {};
            formData.forEach(function(item) {
                updatedData[item.name] = item.value;
            });
        
            // TODO: Implement the logic to save the updatedData
            console.log(updatedData);

            Swal.fire({
                title: 'ไม่สามารถแก้ไขได้',
                text: 'ขออภัยในความไม่สะดวก ระบบยังไม่เปิดให้แก้ไขข้อมูล',
                icon: 'warning',
                confirmButtonText: 'ตกลง'
            });
        
            // Hide the modal after saving changes
            $('#editModal').modal('hide');
        
            // Optionally, update the DataTable with the new data
            var table = $('#userTable').DataTable();
            var selectedRowIndex = table.row({ selected: true }).index();
            table.row(selectedRowIndex).data(updatedData).draw();
        });
        
        

        loadAPI()
    }
}

function loadAPI() {
    // ให้เรียกใช้ API ที่นี่
    // เมื่อโหลดเสร็จแล้วให้ปิด Swal.fire
    Swal.fire({
        icon: "success",
        title: "ดาวน์โหลดสำเร็จ",
        showConfirmButton: false,
        timer: 2500
    });
}

function openWeb() {
    Swal.fire({
        title: 'แสกนเพื่อลงทะเบียน',
        text: 'คลิก "ตกลง" เพื่อเปิดหน้าบันทึกข้อมูล ท่านไม่สามารถบันทึกข้อมูลให้บุคคลอื่นได้ โปรดแชร์ลิงค์ให้เจ้าตัวกรอกข้อมูลด้วยตนเอง',
        imageUrl: "https://lh5.googleusercontent.com/d/1ZJAYV6xaIwKxItF8ecFHWKCNZbwsrivr",
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            window.open('register.html', '_blank');
        }
    });
}

// แดชบอร์ด
function opendash() {
    Swal.fire({
        title: 'อยู่ในระหว่างการพัฒนา',
        text: 'ระบบกำลังอยู่ในระหว่างการพัฒนา',
        icon: 'info',
        confirmButtonText: 'ตกลง'
    });
    // Swal.fire({
    //     title: 'ยืนยันการดำเนินการ',
    //     text: 'คลิก "ตกลง" เพื่อเปิดหน้าแสดงข้อมูล',
    //     icon: 'question',
    //     showCancelButton: true,
    //     confirmButtonText: 'ตกลง',
    //     cancelButtonText: 'ยกเลิก',
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         window.open('https://lookerstudio.google.com/reporting/59437449-657d-4dbb-9297-a2e63b2204ae', '_blank');
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //         Swal.fire('การดำเนินการถูกยกเลิก', '', 'info');
    //     }
    // });
}


// เข้าสู่ระบบ
async function getProfile() {
    const profile = await liff.getProfile();
    const yourid = profile.userId;
    const yourpic = profile.pictureUrl;
    getmember(yourid, yourpic);
}

async function getmember(yourid, yourpic) {
    // showLoading();
    let gas = `https://script.google.com/macros/s/AKfycbwzAc-k3OSgaWzc3lquqWR2GS9Vy5-UWow6y6mu6bGZk-YiPuN_D-53dk8TWhPmWFITcA/exec?id=${yourid}`;
    const records = await fetch(gas);
    const data = await records.json();
    // console.log(data.user);
    if (data.user === null || data.user === undefined || data.user == 0) {
        Swal.fire({
            confirmButtonColor: '#0ef',
            icon: 'error',
            title: 'ไม่พบข้อมูลของคุณในระบบ',

        }).then((result) => {
            // ตรวจสอบว่าผู้ใช้กดปุ่มตกลงหรือไม่
            if (result.isConfirmed) {
                // กระทำที่ต้องการทำหลังจากกดปุ่มตกลง
                console.log("ผิดพลาด")
                window.location.href = 'register.html'; // https://liff.line.me/1654797991-nkGwelwo
            }
        });
    } else {
        localStorage.setItem("yourpic", yourpic);
        data.user.forEach(function (user) {
            // localStorage.setItem("uuid", user.uuid);
            // localStorage.setItem("cidhash", user.cidhash);
            localStorage.setItem("userid", user.userid);
            localStorage.setItem("name", user.name);
            localStorage.setItem("job", user.job);
            localStorage.setItem("mainsub", user.mainsub);
            localStorage.setItem("office", user.office);
            // localStorage.setItem("oflat", user.oflat);
            // localStorage.setItem("oflong", user.oflong);
            // localStorage.setItem("db1", user.db1);
            // localStorage.setItem("token", user.token);
            localStorage.setItem("status", user.status);
            localStorage.setItem("role", user.role);
            // localStorage.setItem("boss", user.boss);
            // localStorage.setItem("ceo", user.ceo);
            localStorage.setItem("docno1", user.docno1);
            localStorage.setItem("docno2", user.docno2);
            localStorage.setItem("upic", user.upic);
            localStorage.setItem("expdate", user.expdate);

            // แสดงข้อมูล


            Swal.fire({
                confirmButtonColor: '#0ef',
                icon: 'success',
                title: 'ลงชื่อเข้าใช้สำเร็จแล้ว'
            }).then((result) => {
                // ตรวจสอบว่าผู้ใช้กดปุ่มตกลงหรือไม่
                if (result.isConfirmed) {
                    // กระทำที่ต้องการทำหลังจากกดปุ่มตกลง
                    window.location.href = 'index.html';
                    console.log("สำเร็จ")
                }
            });
        });
        //    hideLoading() ;    

    }
}

function clearLocal() {
    // เรียกใช้ localStorage.clear() เพื่อลบข้อมูลทั้งหมดใน Local Storage
    Swal.fire({
        title: 'ยืนยันการดำเนินการ',
        text: 'กด "ตกลง" เพื่อดำเนินการ รีเช็ต เพื่อรับค่าใหม่',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            Swal.fire({
                confirmButtonColor: '#0ef',
                icon: 'success',
                title: 'รีเซ็ตข้อมูลสำเร็จ'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('การดำเนินการถูกยกเลิก', '', 'info');
        }
    });
}

// แดชบอร์ด
document.addEventListener("DOMContentLoaded", function () {
    // Define the API endpoint
    var gas = 'https://script.google.com/macros/s/AKfycbw38l4dx3_L-ljv1NRMBC-yqx3OXdscgatTSTJly3crOUAYGrM8n2CkJObLbtgNjeCaHA/exec';

    // Select the element with id "utimeline"
    var utimelineElement = document.getElementById("utimeline");
    var sumdataElement = document.getElementById("sumdata");

    // Fetch data from the server
    fetch(gas)
        .then(response => response.json())
        .then(data => {
            if (data.cc && data.cc.length > 0) {
                // Assuming the server response has a property named 'cc' and each item has 'total'
                var timelineData = data.cc.map(item => `${item.total}`).join(', ');
                // console.log(timelineData);
                var sumdatt = data.cc.map(item => item.cnumber); // ดึงค่า cnumber ออกมาจากทุกๆ item ในอาร์เรย์ cc
                var totalSum = sumdatt.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // รวมค่าทั้งหมดในอาร์เรย์ sumdatt
                //   console.log(totalSum - 1); // แสดงผลรวมทั้งหมด
                // Set the text content of the element with the fetched data
                utimelineElement.innerText = timelineData;
                sumdataElement.innerText = `จำนวนผู้ลงทะเบียน ${totalSum - 1} คน`;
            } else {
                var timelineData = `ผิดพลาด!`;
                utimelineElement.innerText = timelineData;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle fetch errors here
        });
});




// line 1654797991-oDWLGzLM
async function main() {
    // hideLoading() ;  
    await liff.init({ liffId: "1654797991-oDWLGzLM" })
    if (liff.isLoggedIn()) {
        getProfile();
    } else {
        liff.login()
    }
}

