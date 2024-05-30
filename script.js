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


// ตรวจสอบข้อมูล
window.onload = function() {
    // เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
    checkLocalStorage();
};

async function checkLocalStorage() {
    // ตรวจสอบค่า uuid ใน local storage
   // var storedUUID = localStorage.getItem("userid");
    var storedDOCID = localStorage.getItem("docno1");

    // ถ้าค่า uuid ไม่มีหรือเป็นค่าว่าง
      if ( !storedDOCID || storedDOCID.trim() === "") {
        // ไปหน้า login
        main();
    } else {

        let timerInterval;
        let startTime;

        Swal.fire({
            title: "กำลังดาวน์โหลด...",
            html: 'เวลา <b>0</b> วินาที',
            position: "top-start",
            timerProgressBar: true,
            didOpen: () => {
                // เพิ่มดีเลย์เล็กน้อยเพื่อให้แน่ใจว่า HTML ของ Swal ถูกเรนเดอร์เรียบร้อยแล้ว
                setTimeout(() => {
                    const container = Swal.getHtmlContainer();
                    const timer = container.querySelector("b");
                    if (timer) {
                        startTime = Date.now();
                        Swal.showLoading();
                        timerInterval = setInterval(() => {
                            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                            timer.textContent = elapsedTime;
                        }, 100);
                    } else {
                        console.error("ไม่พบแท็ก <b> ใน HTML ของ Swal");
                    }
                }, 100); // ดีเลย์ 100 มิลลิวินาที
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
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


        // เดือนปัจจุบัน
        // const currentDate = new Date();
        // const year = currentDate.getFullYear();
        // let month = currentDate.getMonth() + 1; // เพิ่ม 1 เนื่องจากเดือนเริ่มที่ 0
        // month = month < 10 ? '0' + month : month; // ใส่ 0 ด้านหน้าถ้าน้อยกว่า 10

        // const yyyymm = year.toString() + month.toString();
      //  console.log(userid);


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
        <td>${user.main}</td>
        <td>${user.sub}</td>
        <td>${user.docno1}</td>
        <td>${user.docno2}</td>
        <td>${user.docdate1}</td>
        <td>${user.docdate2}</td>
        <td>${user.docdate3}</td>
        <td>${user.tel}</td>   
        <td>${user.mail}</td>    
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
                { "data": 'main' },
                { "data": 'sub' },
                { "data": 'docno1' },
                { "data": 'docno2' },
                { "data": 'docdate1' },
                { "data": 'docdate2' },
                { "data": 'docdate3' },
                { "data": 'tel' },
                { "data": 'mail' },
                { "data": 'dupdate' }
            ],
            "processing": true,
            "responsive": true,
            "order": [[13, 'asc'],[4, 'asc'], [5, 'asc']],
            "dom": 'lBfrtip',
            "lengthMenu": [[10, 30, 70, 100, 150, 200, -1], [10, 30, 70, 100, 150, 200, "ทั้งหมด"]],
            "buttons": [
                'excel', 'print',
            ],
            "pageLength": 100,
            "language": {
                "url": 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json'
            },
            // "search": {
            //     "search": yyyymm
            // }
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
        timer: 3000
    });
}

function openWeb() {
    Swal.fire({
        title: 'ยืนยันการดำเนินการ',
        text: 'คลิก "ตกลง" เพื่อเปิดหน้าบันทึกข้อมูล',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            window.open('fire.html', '_blank');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('การดำเนินการถูกยกเลิก', '', 'info');
        }
    });
}

// ดับเพลิง
function opendash() {
    Swal.fire({
        title: 'ยืนยันการดำเนินการ',
        text: 'คลิก "ตกลง" เพื่อเปิดหน้าแสดงข้อมูล',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed) {
            window.open('https://lookerstudio.google.com/reporting/59437449-657d-4dbb-9297-a2e63b2204ae', '_blank');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('การดำเนินการถูกยกเลิก', '', 'info');
        }
    });
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
                title: 'ลงชื่อเข้าใช้สำเร็จแล้ว',
position: "top-start",
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
    localStorage.clear();

    Swal.fire({
        confirmButtonColor: '#0ef',
        icon: 'success',
        title: 'Local Storage has been cleared.'
    })
}

// function showLoading() {
//   var overlay = document.getElementById('loadingOverlay');
//   overlay.style.display = 'flex';
// }

// function hideLoading() {
//   var overlay = document.getElementById('loadingOverlay');
//   overlay.style.display = 'none';
// }


async function main() {
    // hideLoading() ;  
    await liff.init({ liffId: "1654797991-oDWLGzLM" })
    if (liff.isLoggedIn()) {
        getProfile();
    } else {
        liff.login()
    }
}
