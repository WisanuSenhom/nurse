particlesJS("particles", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.8,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "push",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
  });
}

window.addEventListener("scroll", function () {
  var scrollTopButton = document.querySelector(".scroll-top");
  if (this.window.pageYOffset > 200) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
});

function calculateDaysUntilExpiry(expiryDate) {
  // Get the current date
  const currentDate = new Date();

  // Parse the expiry date
  const expiry = new Date(expiryDate);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = expiry - currentDate;

  // Convert milliseconds to days
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const daysUntilExpiry = Math.ceil(
    differenceInMilliseconds / millisecondsInADay
  );

  return daysUntilExpiry;
}

// ตรวจสอบข้อมูล

window.onload = function () {
  // เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์
  checkusertimer();
};

function checkusertimer() {
  const lastdate = localStorage.getItem("lastdate");
    // Example usage
  const days = calculateDaysUntilExpiry(lastdate);
  // Format the number with commas
  const itimer = days.toLocaleString();

  if(itimer <= -30 || !lastdate){
    localStorage.setItem("docno1", "");
  }
  checkLocalStorage();
}

async function checkLocalStorage() {
  // ตรวจสอบค่า uuid ใน local storage
  // var storedUUID = localStorage.getItem("userid");
  var storedDOCID = localStorage.getItem("docno1");

  // ถ้าค่า uuid ไม่มีหรือเป็นค่าว่าง
  if (!storedDOCID || storedDOCID.trim() === "") {
    // ไปหน้า login
    main();
  } else {
    Swal.fire({
      title: "กำลังโหลดข้อมูล!",
      text: "กรุณารอสักครู่",
      showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
      allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
      didOpen: () => {
        Swal.showLoading(); // แสดงตัวโหลด
      },
    });

    var userid = localStorage.getItem("userid");
    var username = localStorage.getItem("name");

    var ymd = localStorage.getItem("ymd");

    // Example usage
    const expiryDate = ymd; // Replace with your expiry date
    const days = calculateDaysUntilExpiry(expiryDate);

    // Format the number with commas
    const formattedDays = days.toLocaleString();

    // console.log(`There are ${formattedDays} days until the expiry date.`);

    // ข้อมูลส่วนบุคคล
    //รูป
    document.querySelector("#yourpic").src = localStorage.getItem("yourpic");
    //อักษร
    document.querySelector("#iname").innerText =
      localStorage.getItem("name") + " " + localStorage.getItem("job");

    document.querySelector("#imore").innerText =
      "ปฏิบัติงานที่ : " +
      localStorage.getItem("office") +
      " สังกัด " +
      localStorage.getItem("mainsub") +
      "\nเลขที่ใบประกอบ : " +
      localStorage.getItem("docno1") +
      "\nหมดอายุ : " +
      localStorage.getItem("expdate") +
      "\nคงเหลือ : " +
      formattedDays +
      " วัน";

    document.querySelector("#lastdate").innerText =
      "ลงชื่อเข้าใช้งานเมื่อ : " + localStorage.getItem("lastdate");

    // ไม่ให้ User เปลี่ยนสถานะ
    if (localStorage.getItem("roleuser") === "user") {
      document.querySelector('option[value="Active"]').disabled = true;
      document.querySelector('option[value="Pending"]').disabled = true;
      document.querySelector('option[value="Deactive"]').disabled = true;
    }

    loadAPI();
    loadTable(userid);
  }
}

async function loadTable(userid) {
  const xurl = `https://script.google.com/macros/s/AKfycbylCw3tDaOSVObW7x8NQxONmO-bhe16NPnOOOJm0nRIfXZEuLdF2irlh3AxoqeN7oci/exec?id=${userid}`;

  const records = await fetch(xurl);
  const data = await records.json();

  let tab = "";
  data.user.forEach(function (user) {
    tab += `<tr>
       <td>${user.id}</td>
   
        <td>${user.pname}</td>
        <td>${user.fname}</td>
        <td>${user.lname}</td>
        <td>${user.birthday}</td>
        <td>${user.age}</td>
        <td>${user.job}</td>
        <td>${user.work}</td>
        <td>${user.main}</td>
        <td>${user.sub}</td>
        <td>${user.docno1}</td>
        <td>${user.docno2}</td>
        <td>${user.docdate1}</td>
        <td>${user.expire}</td>
        <td>${user.docdate3}</td>
        <td>${user.dgdate1}</td>
        <td>${user.dgdate2}</td>
        <td>${user.dgdate3}</td>
        <td>${user.course}</td>   
        <td>${user.tel}</td>   
        <td>${user.mail}</td> 
        <td>${user.note}</td> 
        <td>${user.mywork}</td> 
        <td>${user.role}</td>     
        <td>${user.dupdate}</td>    
        <td>${user.editordate}</td>     

         </tr>`;
  });

  document.getElementById("tbody").innerHTML = tab;
  $("#userTable").DataTable({
    data: data.user,
    columns: [
      { data: "id" },
      { data: "status" },
      { data: "pname" },
      { data: "fname" },
      { data: "lname" },
      { data: "birthday" },
      { data: "age" },
      { data: "job" },
      { data: "work" },
      { data: "main" },
      { data: "sub" },
      { data: "docno1" },
      { data: "docno2" },
      { data: "docdate1" },
      { data: "expire" },
      { data: "docdate3" },
      { data: "dgdate1" },
      { data: "dgdate2" },
      { data: "dgdate3" },
      { data: "course" },
      { data: "tel" },
      { data: "mail" },
      { data: "note" },
      { data: "mywork" },
      { data: "role" },
      { data: "dupdate" },
      { data: "editordate" },
    ],
    columnDefs: [
      {
        targets: 14, // คอลัมน์ที่ 1 (เริ่มจาก 0)
        render: $.fn.dataTable.render.number(",", ".", 0, ""), // ตั้งค่าคอมมา
      },
    ],
    processing: true,
    responsive: true,
    colReorder: true,
    fixedColumns: true,
    fixedHeader: true,
    order: [
      [9, "asc"],
      [10, "asc"],
      [8, "asc"],
    ],
    dom: "lBfrtip",
    lengthMenu: [
      [10, 30, 70, 100, 150, 200, -1],
      [10, 30, 70, 100, 150, 200, "ทั้งหมด"],
    ],
    buttons: [
      "excel",
      "print",
      {
        text: "แก้ไข/เพิ่มเติม",
        action: async function () {
          var selectedRows = $("#userTable")
            .DataTable()
            .rows({ selected: true })
            .data();

          if (selectedRows.length > 0) {
            var selectData = selectedRows[0];

            // Populate the form with the initial values
            $("#editId").val(selectData.id);
            $("#editstatus").val(selectData.status);
            $("#editPName").val(selectData.pname);
            $("#editFName").val(selectData.fname);
            $("#editLName").val(selectData.lname);
            $("#editbirth").val(selectData.birthday);
            $("#editAge").val(selectData.age);
            $("#editJob").val(selectData.job);
            $("#editWork").val(selectData.work);
            $("#editMain").val(selectData.main);
            $("#editSub").val(selectData.sub);
            $("#editDocno1").val(selectData.docno1);
            $("#editDocno2").val(selectData.docno2);
            $("#editDocdate1").val(selectData.docdate1);
            $("#editDocdate3").val(selectData.docdate3);
            $("#editdgdate1").val(selectData.dgdate1);
            $("#editdgdate2").val(selectData.dgdate2);
            $("#editdgdate3").val(selectData.dgdate3);
            $("#editcourse").val(selectData.course);
            $("#editTel").val(selectData.tel);
            $("#editMail").val(selectData.mail);
            $("#editNote").val(selectData.note);
            $("#editmywork").val(selectData.mywork);
            $("#editRole").val(selectData.role);
            $("#editDupdate").val(selectData.dupdate);
            $("#editordate").val(selectData.editordate);
            $("#editexpire").val(selectData.expire);

            // Show the modal
            $("#editModal").modal("show");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "กรุณาเลือกแถวที่ต้องการแก้ไขข้อมูล!",
            });
          }
        },
      },
      // หน่วยงาน
      {
        text: "แก้ไขหน่วยงาน",
        action: async function () {
          // Get selected rows from the 'userdata' DataTable
          var selectedRows = $("#userTable")
            .DataTable()
            .rows({ selected: true })
            .data();

          if (selectedRows.length > 0) {
            var selectData = selectedRows[0];

            // Show loading dialog
            Swal.fire({
              title: "กำลังโหลดข้อมูล! หน่วยงาน",
              showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
              allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
              didOpen: () => {
                Swal.showLoading(); // แสดงตัวโหลด
              },
            });

            // Show SweetAlert2 modal for role selection
            const inputOptions = await fetchInputOptions();
            const { value: category } = await Swal.fire({
              title: "กำหนดหน่วยงาน",
              input: "select",
              inputOptions: inputOptions,
              inputPlaceholder: "เลือกหน่วยงานหลัก",
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value || value === "สังกัด") {
                  return "โปรดเลือกหน่วยงาน";
                }
              },
            });

            if (category) {
              // Show loading dialog
              Swal.fire({
                title: "กำลังโหลดข้อมูล! หน่วยงานย่อย",
                showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
                allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
                didOpen: () => {
                  Swal.showLoading(); // แสดงตัวโหลด
                },
              });

              const subcategories = await fetchSubcategoryOptions(category);
              const { value: subcategory } = await Swal.fire({
                title: "กำหนดหน่วยงานย่อย",
                input: "select",
                inputOptions: subcategories.reduce(
                  (options, subcategory) => {
                    options[subcategory.id] = subcategory.name;
                    return options;
                  },
                  { "": "โปรดเลือกหน่วยงานย่อย" }
                ),
                inputPlaceholder: "เลือกหน่วยงานย่อย",
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "โปรดเลือกหน่วยงานย่อย";
                  }
                },
              });

              if (subcategory) {
                Swal.fire({
                  title: "กำลังโหลดข้อมูล!",
                  showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
                  allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
                  didOpen: () => {
                    Swal.showLoading(); // แสดงตัวโหลด
                  },
                });

                // Load subdata and show confirmation dialog
                const subdatas = await loadSubdatas(category, subcategory);
                const subdata = subdatas[0]; // Assuming you want the first subdata item
                //  console.log(subdatas[0]);
                const { isConfirmed } = await Swal.fire({
                  title:
                    "กำหนดหน่วยงานให้ : " +
                    selectData.pname +
                    selectData.fname +
                    " " +
                    selectData.lname,
                  html: `สังกัด : ${subdata.maincode}  ${category} <br>  หน่วยงาน/กลุ่มงาน : ${subdata.subcode}  ${subcategory} <br> อำเภอ : ${subdata.amphor} <br>`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "บันทึก",
                  cancelButtonText: "ยกเลิก",
                });

                if (isConfirmed) {
                  Swal.fire({
                    title: "กำลังบันทึกข้อมูล!",
                    text: "โปรดรอสักครู่",
                    showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
                    allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
                    didOpen: () => {
                      Swal.showLoading(); // แสดงตัวโหลด
                    },
                  });
                  try {
                    // Send data to Google Apps Script Web App
                    let ggdata = `https://script.google.com/macros/s/AKfycbwt7jh-2c65VgpOGfMsAxajtIHJBifDnXSp5gsLdy-WYBmFKc-FzfxQBdz44o3mUrSL/exec?id=${selectData.id}&category=${category}&subcategory=${subcategory}&maincode=${subdata.maincode}&subcode=${subdata.subcode}&amphor=${subdata.amphor}`;

                    let response = await fetch(ggdata);
                    let data = await response.json();

                    if (data.status === "success") {
                      Swal.fire({
                        title: "บันทึกสำเร็จ",
                        text: "ข้อมูลของคุณได้ถูกบันทึกแล้ว",
                        icon: "success",
                        confirmButtonText: "ตกลง",
                      }).then(() => {
                        // Update DataTable with new data
                        var table = $("#userTable").DataTable();
                        var selectedRowIndex = table
                          .row({ selected: true })
                          .index();

                        // Assuming `updatedData` is the updated row data you want to set
                        var updatedData = {
                          ...selectData,
                          main: category,
                          sub: subcategory,
                        };

                        table
                          .row(selectedRowIndex)
                          .data(updatedData)
                          .draw(false);
                      });
                    } else {
                      Swal.fire({
                        title: "เกิดข้อผิดพลาด",
                        text: "ไม่สามารถบันทึกข้อมูลได้: " + data.message,
                        icon: "error",
                        confirmButtonText: "ตกลง",
                      });
                    }
                  } catch (error) {
                    console.error("Error:", error);
                    Swal.fire({
                      title: "เกิดข้อผิดพลาด",
                      text: "ไม่สามารถบันทึกข้อมูลได้",
                      icon: "error",
                      confirmButtonText: "ตกลง",
                    });
                  }
                } else {
                  console.log("Action cancelled");
                  Swal.fire({
                    title: "การบันทึกถูกยกเลิก",
                    text: "ข้อมูลของคุณยังไม่ถูกเปลี่ยนแปลง",
                    icon: "info",
                    confirmButtonText: "ตกลง",
                  });
                }
              }
            }
          } else {
            // Show error message if no row is selected
            Swal.fire({
              icon: "error",
              title: "Oops...No row selected!",
              text: "โปรดเลือกรายการที่ต้องการกำหนด/แก้ไขหน่วยงาน",
            });
          }
        },
      },
      // เพิ่มผลงาน
      {
        text: "เพิ่ม ผลงาน/วิจัย/นวัตกรรม",
        action: async function () {
          // Get selected rows from the 'userdata' DataTable
          var selectedRows = $("#userTable")
            .DataTable()
            .rows({ selected: true })
            .data();

          if (selectedRows.length > 0) {
            var selectData = selectedRows[0];
            // Show SweetAlert2 modal for role selection
            const { value: formValues } = await Swal.fire({
              title: "กรอกข้อมูล",
              showCancelButton: true,
              html: `<input id="date" type="date" class="swal2-input" placeholder="วันที่">
                    <select id="work" class="swal2-select" placeholder="ผลงาน">
                        <option value="">เลือกผลงาน</option>
                        <option value="ผลงานวิจัย">ผลงานวิจัย</option>
                        <option value="ผลงานวิชาการ">ผลงานวิชาการ</option>
                        <option value="นวัตกรรม">นวัตกรรม</option>
                    </select>
                   
                    <textarea id="work2" class="swal2-textarea" placeholder="ชื่อผลงาน"></textarea>
                    <textarea id="details" class="swal2-textarea" placeholder="รายละเอียด"></textarea>`,
              focusConfirm: false,
              preConfirm: () => {
                const date = document.getElementById("date").value;
                const work = document.getElementById("work").value;
                const work2 = document.getElementById("work2").value;
                const details = document.getElementById("details").value;
                if (!date || !work || !work2) {
                  Swal.showValidationMessage("โปรดกรอกข้อมูลให้ครบทุกช่อง");
                }
                return {
                  date: date,
                  work: work,
                  work2: work2,
                  details: details,
                };
              },
            });

            // Handle form submission
            if (formValues) {
              const { date, work, work2, details } = formValues;

              // Process the data here
              var updatedData = {};
              updatedData["id"] = selectData.id;
              updatedData["pname"] = selectData.pname;
              updatedData["fname"] = selectData.fname;
              updatedData["lname"] = selectData.lname;
              updatedData["mains"] = selectData.main;
              updatedData["sub"] = selectData.sub;
              updatedData["dates"] = date;
              updatedData["work"] = work;
              updatedData["work2"] = work2;
              updatedData["details"] = details;

              // Show confirmation dialog for saving changes
              Swal.fire({
                title:
                  "เพิ่มข้อมูลให้ : " +
                  selectData.pname +
                  selectData.fname +
                  " " +
                  selectData.lname,
                text: "คุณต้องการบันทึกข้อมูลหรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "บันทึก",
                cancelButtonText: "ยกเลิก",
              }).then((result) => {
                if (result.isConfirmed) {
                  // Show loading dialog
                  Swal.fire({
                    title: "กำลังบันทึกข้อมูล!",
                    text: "กรุณารอสักครู่",
                    showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
                    allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
                    didOpen: () => {
                      Swal.showLoading(); // แสดงตัวโหลด
                    },
                  });
                  // Send data to Google Apps Script Web App
                  let params = new URLSearchParams(updatedData).toString();
                  //  console.log(params);
                  let ggdata = `https://script.google.com/macros/s/AKfycbzzcQuhUE9HUGbfnsjb1BQsF9iBd2vJWIi0UhZ9ZTyMBo9uUeULrrONK0EB5SLt03gSqg/exec?${params}`;
                  fetch(ggdata)
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.status === "success") {
                        Swal.fire({
                          title: "บันทึกสำเร็จ",
                          text: "ข้อมูลของคุณได้ถูกบันทึกแล้ว",
                          icon: "success",
                          confirmButtonText: "ตกลง",
                        }).then(() => {
                          location.reload();
                        });
                      } else {
                        Swal.fire({
                          title: "เกิดข้อผิดพลาด",
                          text: "ไม่สามารถบันทึกข้อมูลได้: " + data.message,
                          icon: "error",
                          confirmButtonText: "ตกลง",
                        });
                      }
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                      Swal.fire({
                        title: "เกิดข้อผิดพลาด",
                        text: "ไม่สามารถบันทึกข้อมูลได้",
                        icon: "error",
                        confirmButtonText: "ตกลง",
                      });
                    });
                } else {
                  Swal.fire({
                    title: "การบันทึกถูกยกเลิก",
                    text: "ข้อมูลของคุณยังไม่ถูกเปลี่ยนแปลง",
                    icon: "info",
                    confirmButtonText: "ตกลง",
                  });
                }
              });
            }
          } else {
            // Show error message if no row is selected
            Swal.fire({
              icon: "error",
              title: "Oops...No row selected!",
              text: "โปรดเลือกรายการที่ต้องการเพิ่มข้อมูล",
            });
          }
        },
      },
      // ดูข้อมูลผลงาน
      {
        text: "ดูผลงาน/วิจัย/นวัตกรรม",
        action: async function () {
          // Get selected rows from the 'userdata' DataTable
          var selectedRows = $("#userTable")
            .DataTable()
            .rows({ selected: true })
            .data();

          if (selectedRows.length > 0) {
            var selectData = selectedRows[0];
            // Show loading dialog
            Swal.fire({
              title: "กำลังโหลดข้อมูล!",
              text: "กรุณารอสักครู่",
              showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
              allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
              didOpen: () => {
                Swal.showLoading(); // แสดงตัวโหลด
              },
            });
            // Fetch data from server
            try {
              const response = await fetch(
                `https://script.google.com/macros/s/AKfycbxjB5Ddcpe0v_UuPDd6gx_gCrZtjm2fHYZ2JbGqPWWrhh-tBze-Mf3Ks5ccYJIcd7VA/exec?id=${selectData.id}`
              );
              if (!response.ok) {
                Swal.fire({
                  icon: "error",
                  title: "เกิดข้อผิดพลาด",
                  text: "ไม่พบข้อมูล!",
                });
                return; // ออกจากฟังก์ชันหากเกิดข้อผิดพลาด
              }
              const data = await response.json();

              // Prepare HTML content to display fetched data
              let htmlContent = '<table class="swal2-table">';
              data.forEach((item) => {
                htmlContent += `<tr><td>วันที่:</td><td>${item.dates}</td></tr>`;
                htmlContent += `<tr><td>หัวข้อ</td><td>${item.titile}</td></tr>`;
                htmlContent += `<tr><td>เรื่อง:</td><td>${item.text}</td></tr>`;
                htmlContent += `<tr><td>รายละเอียด:</td><td>${item.more}</td></tr>`;
                // เพิ่มคอลัมน์เพิ่มเติมถ้าต้องการ
              });
              htmlContent += "</table>";

              // Show SweetAlert2 modal with fetched data
              await Swal.fire({
                title:
                  "ผลงาน/นวัตกรรม/วิจัย ของคุณ" +
                  selectData.fname +
                  " " +
                  selectData.lname,
                html: htmlContent,
                // Your Swal.fire configuration options
              });
            } catch (error) {
              console.error("Error fetching data:", error);
              // Handle error, show error message, etc.
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "มีข้อผิดพลาดในการดึงข้อมูล โปรดลองอีกครั้งในภายหลัง",
              });
            }
          } else {
            // Show error message if no row is selected
            Swal.fire({
              icon: "error",
              title: "Oops...No row selected!",
              text: "โปรดเลือกรายการที่ต้องการดูข้อมูล",
            });
          }
        },
      },

      //สิทธิ์
      {
        text: "กำหนดสิทธิ์",
        action: async function () {
          // Get selected rows from the 'userdata' DataTable
          var selectedRows = $("#userTable")
            .DataTable()
            .rows({ selected: true })
            .data();

          if (selectedRows.length > 0) {
            var selectData = selectedRows[0];
            // Show SweetAlert2 modal for role selection

            const result = await Swal.fire({
              title:
                "กำหนดสิทธิ์ให้ : " +
                selectData.pname +
                selectData.fname +
                " " +
                selectData.lname,
              input: "select",
              inputOptions: {
                user: "ดูได้เฉพาะตนเอง",
                staff: "ดูได้ภายในหน่วยงาน",
                admin: "ดูได้ภายในสังกัด",
                ceo: "ดูได้ภายในอำเภอ",
                dev: "ดูได้ทั้งหมด",
              },
              inputPlaceholder: "เลือกสิทธิ์",
              inputValue: selectData.role, // Set default value from selectData.role
              showCancelButton: true,
              preConfirm: (value) => {
                return new Promise((resolve) => {
                  Swal.fire({
                    title: "ยืนยันการบันทึก",
                    text: "คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "บันทึก",
                    cancelButtonText: "ยกเลิก",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // แสดงการโหลด
                      Swal.fire({
                        title: "กำลังบันทึกข้อมูล!",
                        text: "กรุณารอสักครู่",
                        showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
                        allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
                        didOpen: () => {
                          Swal.showLoading(); // แสดงตัวโหลด
                        },
                      });
                      // ส่งข้อมูลไปยัง Google Apps Script Web App
                      let ggdata = `https://script.google.com/macros/s/AKfycbwmtgw4_saeyuBY16WF7fyGhZE19E7gRieZpyARhD6sWfF39BdZN93icLAHpdLEoR0I/exec?id=${
                        selectData.id
                      }&role=${value}&userid=${localStorage.getItem("userid")}`;
                      fetch(ggdata)
                        .then((response) => response.json())
                        .then((data) => {
                          if (data.status === "success") {
                            Swal.fire({
                              title: "บันทึกสำเร็จ",
                              text: "ข้อมูลของคุณได้ถูกบันทึกแล้ว",
                              icon: "success",
                              confirmButtonText: "ตกลง",
                            }).then(() => {
                              // อัปเดต DataTable ด้วยข้อมูลใหม่
                              var table = $("#userTable").DataTable();
                              var selectedRowIndex = table
                                .row({ selected: true })
                                .index();

                              // Assuming `updatedData` is the updated row data you want to set
                              var updatedData = {
                                ...selectData,
                                role: value,
                              };

                              table
                                .row(selectedRowIndex)
                                .data(updatedData)
                                .draw(false);
                            });
                          } else {
                            Swal.fire({
                              title: "เกิดข้อผิดพลาด",
                              text: "ไม่สามารถบันทึกข้อมูลได้: " + data.message,
                              icon: "error",
                              confirmButtonText: "ตกลง",
                            });
                          }
                        })
                        .catch((error) => {
                          console.error("Error:", error);
                          Swal.fire({
                            title: "เกิดข้อผิดพลาด",
                            text: "ไม่สามารถบันทึกข้อมูลได้",
                            icon: "error",
                            confirmButtonText: "ตกลง",
                          });
                        });
                    } else {
                      Swal.fire({
                        title: "การบันทึกถูกยกเลิก",
                        text: "ข้อมูลของคุณยังไม่ถูกเปลี่ยนแปลง",
                        icon: "info",
                        confirmButtonText: "ตกลง",
                      });
                    }
                  });
                });
              },
            });

            // Handle cancel button or dismiss event
            if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                icon: "info",
                title: "Cancelled",
                text: "การกำหนดสิทธิ์ถูกยกเลิก.",
              });
            }
          } else {
            // Show error message if no row is selected
            Swal.fire({
              icon: "error",
              title: "Oops...No row selected!",
              text: "โปรดเลือกรายการที่ต้องการกำหนด/แก้ไขสิทธิ์",
            });
          }
        },
      },
      //ลบ
      {
        text: "ลบข้อมูล",
        action: async function () {
          // Get selected rows from the 'userdata' DataTable
          var selectedRows = $("#userTable")
            .DataTable()
            .rows({ selected: true })
            .data();

          if (selectedRows.length > 0) {
            var selectData = selectedRows[0];
            // Show SweetAlert2 modal for role selection
            const { value: accept } = await Swal.fire({
              title: "หากลบข้อมูลแล้วไม่สามารถเรียกคืนข้อมูลได้ ",
              input: "checkbox",
              showCancelButton: true,
              inputValue: 0,
              inputPlaceholder: `ข้าพเจ้า ${localStorage.getItem(
                "name"
              )} ยอมรับและดำเนินการ ลบข้อมูลของ ${selectData.pname}${
                selectData.fname
              } ${selectData.lname}`,
              confirmButtonText: `Continue&nbsp;<i class="fa fa-arrow-right"></i>`,
              inputValidator: (result) => {
                return !result && "กรุณา ติ๊ก ยอมรับหากต้องการดำเนินการ";
              },
            });

            if (accept) {
              // Function to handle CAPTCHA verification
              const handleCaptchaVerification = async () => {
                generateCaptcha();
                const captchaResult = await Swal.fire({
                  title: `กรอกรหัสยืนยัน ในการลบข้อมูลของ ${selectData.pname}${selectData.fname} ${selectData.lname}`,
                  showCancelButton: true,
                  confirmButtonText: `ยืนยัน&nbsp;<i class="fa-solid fa-trash"></i>`,
                  html: `<canvas id="captchaPopupCanvas" width="200" height="50"></canvas><br>
                                           <input type="text" id="captchaInput" class="swal2-input" placeholder="Enter the code here">`,
                  didOpen: () => {
                    drawCaptcha("captchaPopupCanvas");
                  },
                  preConfirm: () => {
                    const userInput = document
                      .getElementById("captchaInput")
                      .value.toUpperCase();
                    if (!userInput) {
                      Swal.showValidationMessage("กรุณากรอกรหัสยืนยัน");
                      return false;
                    }
                    return userInput;
                  },
                  showDenyButton: true,
                  denyButtonText: `ขอรหัสใหม่`,
                  denyButtonColor: "#039be5",
                });

                if (captchaResult.isConfirmed) {
                  const userInput = captchaResult.value;
                  //  console.log('User Input:', userInput); // Log user input

                  if (userInput === captchaText) {
                    // ดำเนินการลบ
                    // แสดงการโหลด
                    Swal.fire({
                      title: "กำลังลบข้อมูล!",
                      text: "กรุณารอสักครู่",
                      showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
                      allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
                      didOpen: () => {
                        Swal.showLoading(); // แสดงตัวโหลด
                      },
                    });
                    // ส่งข้อมูลไปยัง Google Apps Script Web App
                    let ggdata = `https://script.google.com/macros/s/AKfycbzzjkhXqn78mVLhdcVHBVpfh9LHwQYiFTouc4ZLCIdKwK9nL1OIDo76zuoTZ33OhftACQ/exec?targetId=${
                      selectData.id
                    }&delbyname=${localStorage.getItem(
                      "name"
                    )}&delbyid=${localStorage.getItem("userid")}`;
                    // console.log(ggdata);
                    fetch(ggdata)
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.status === "success") {
                          Swal.fire({
                            title: "สำเร็จ",
                            text: "ข้อมูลถูกลบแล้ว",
                            icon: "success",
                            confirmButtonText: "ตกลง",
                          }).then(() => {
                            // โหลดหน้าเว็บใหม่
                            location.reload();
                          });
                        } else {
                          Swal.fire({
                            title: "เกิดข้อผิดพลาด",
                            text: "ไม่สามารถลบข้อมูลได้: " + data.message,
                            icon: "error",
                            confirmButtonText: "ตกลง",
                          });
                        }
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        Swal.fire({
                          title: "เกิดข้อผิดพลาด",
                          text: "ไม่สามารถลบข้อมูลได้",
                          icon: "error",
                          confirmButtonText: "ตกลง",
                        });
                      });
                    // Proceed with deleting the data here
                  } else {
                    Swal.fire({
                      title: "ผิดพลาด!",
                      text: "รหัสยืนยันไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
                      icon: "error",
                      confirmButtonText: "ลองใหม่",
                      preConfirm: () => {
                        // Call the handleCaptchaVerification function
                        handleCaptchaVerification();
                      },
                    });
                  }
                } else if (captchaResult.isDenied) {
                  // Resend CAPTCHA
                  handleCaptchaVerification();
                }
              };

              // Initial call to handle CAPTCHA verification
              handleCaptchaVerification();
            } else {
              // Handle cancel button or dismiss event
              Swal.fire({
                icon: "info",
                title: "Cancelled",
                text: "การลบข้อมูลถูกยกเลิก.",
              });
            }
          } else {
            // Show error message if no row is selected
            Swal.fire({
              icon: "error",
              title: "Oops...No row selected!",
              text: "โปรดเลือกรายการที่ต้องการลบข้อมูล",
            });
          }
        },
      },

      // สิ้นสุดปุ่ม
    ],
    pageLength: 100,
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.7/i18n/th.json",
    },
    select: true,
    createdRow: function (row, data, dataIndex) {
      // Add the span element with the appropriate CSS class to the 'status' column
      const statusCell = $("td", row).eq(1); // Assuming 'status' is the 9th column (index 8)
      const statusClass =
        data.status === "Deactive"
          ? "status deactive"
          : data.status === "Pending"
          ? "status pending"
          : data.status === "Active"
          ? "status completed"
          : "primary";
      statusCell.html(`<span class="${statusClass}">${data.status}</span>`);
    },
  });

  // Save changes handler
  $("#saveChanges").on("click", function () {
    var formData = $("#editForm").serializeArray();
    var updatedData = {};
    formData.forEach(function (item) {
      updatedData[item.name] = item.value;
    });
    // ปิด modal หลังจากบันทึกข้อมูลเรียบร้อยแล้ว
    $("#editModal").modal("hide");
    Swal.fire({
      title: "ยืนยันการบันทึก",
      text: "คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "กำลังบันทึกข้อมูล!",
          text: "โปรดรอ...อาจใช้เวลาในดำเนินการ",
          showConfirmButton: false, // ไม่แสดงปุ่มยืนยัน
          allowOutsideClick: false, // ไม่อนุญาตให้คลิกข้างนอกเพื่อปิด
          didOpen: () => {
            Swal.showLoading(); // แสดงตัวโหลด
          },
        });
        // ส่งข้อมูลไปยัง Google Apps Script Web App
        // console.log(updatedData);
        let params = new URLSearchParams(updatedData).toString();
        let ggdata = `https://script.google.com/macros/s/AKfycbwLPAV3u-nIygZrloMlZMmYVy6OYYJUqWvRs_PxreO-zMvOiYBFi2jTo1V2eTuNLsPJZg/exec?${params}&delbyname=${localStorage.getItem(
          "name"
        )}&delbyid=${localStorage.getItem("userid")}`;
        fetch(ggdata)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              Swal.fire({
                title: "บันทึกสำเร็จ",
                text: "ข้อมูลของคุณได้ถูกบันทึกแล้ว",
                icon: "success",
                confirmButtonText: "ตกลง",
              }).then(() => {
                // อัปเดต DataTable ด้วยข้อมูลใหม่
                var table = $("#userTable").DataTable();
                var selectedRowIndex = table.row({ selected: true }).index();
                table.row(selectedRowIndex).data(updatedData).draw(false);
              });
            } else {
              Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถบันทึกข้อมูลได้: " + data.message,
                icon: "error",
                confirmButtonText: "ตกลง",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถบันทึกข้อมูลได้",
              icon: "error",
              confirmButtonText: "ตกลง",
            });
          });
      } else {
        Swal.fire({
          title: "การบันทึกถูกยกเลิก",
          text: "ข้อมูลของคุณยังไม่ถูกเปลี่ยนแปลง",
          icon: "info",
          confirmButtonText: "ตกลง",
        });
      }
    });
  });
}

function loadAPI() {
  // ให้เรียกใช้ API ที่นี่
  // เมื่อโหลดเสร็จแล้วให้ปิด Swal.fire
  Swal.fire({
    icon: "success",
    title: "ดาวน์โหลดสำเร็จ",
    showConfirmButton: false,
    timer: 2500,
  });
}

function openWeb() {
  Swal.fire({
    title: "แสกนเพื่อลงทะเบียน",
    text: 'คลิก "ตกลง" เพื่อเปิดหน้าบันทึกข้อมูล ท่านไม่สามารถบันทึกข้อมูลให้บุคคลอื่นได้ โปรดแชร์ลิงค์ให้เจ้าตัวกรอกข้อมูลด้วยตนเอง',
    imageUrl:
      "https://lh5.googleusercontent.com/d/1ZJAYV6xaIwKxItF8ecFHWKCNZbwsrivr",
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Custom image",
    showCancelButton: true,
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      window.open("register.html", "_blank");
    }
  });
}

// แดชบอร์ด
function opendash() {
  // Swal.fire({
  //     title: 'อยู่ในระหว่างการพัฒนา',
  //     text: 'ระบบกำลังอยู่ในระหว่างการพัฒนา',
  //     icon: 'info',
  //     confirmButtonText: 'ตกลง'
  // });
  Swal.fire({
    title: "ยืนยันการดำเนินการ",
    text: 'คลิก "ตกลง" เพื่อเปิดหน้าแสดงข้อมูลการลงทะเบียนรายหน่วยงาน',
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
  }).then((result) => {
    if (result.isConfirmed) {
      window.open("https://lookerstudio.google.com/s/pcbRNliIIYQ", "_blank");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("การดำเนินการถูกยกเลิก", "", "info");
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
      confirmButtonColor: "#0ef",
      icon: "error",
      title: "ไม่พบข้อมูลของคุณในระบบ",
    }).then((result) => {
      // ตรวจสอบว่าผู้ใช้กดปุ่มตกลงหรือไม่
      if (result.isConfirmed) {
        // กระทำที่ต้องการทำหลังจากกดปุ่มตกลง
        console.log("ผิดพลาด");
        window.location.href = "register.html"; // https://liff.line.me/1654797991-nkGwelwo
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
      localStorage.setItem("roleuser", user.roleuser);
      localStorage.setItem("lastdate", user.lastdate);
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
      localStorage.setItem("ymd", user.ymd);

      // แสดงข้อมูล

      Swal.fire({
        confirmButtonColor: "#0ef",
        icon: "success",
        title: "ลงชื่อเข้าใช้สำเร็จแล้ว",
        text: "ยินดีต้อนรับ",
      }).then((result) => {
        // ตรวจสอบว่าผู้ใช้กดปุ่มตกลงหรือไม่
        if (result.isConfirmed) {
          // กระทำที่ต้องการทำหลังจากกดปุ่มตกลง
          location.reload();
          //console.log("สำเร็จ");
        }
      });
    });
    //    hideLoading() ;
  }
}

function clearLocal() {
  // เรียกใช้ localStorage.clear() เพื่อลบข้อมูลทั้งหมดใน Local Storage
  Swal.fire({
    title: "ยืนยันการดำเนินการ",
    text: 'กด "ตกลง" เพื่อดำเนินการ รีเช็ต เพื่อรับค่าใหม่',
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ตกลง",
    cancelButtonText: "ยกเลิก",
    showDenyButton: true,
    denyButtonText: `ลงชื่อออก`,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("docno1", "");
      Swal.fire({
        confirmButtonColor: "#0ef",
        icon: "success",
        title: "รีเซ็ตข้อมูลสำเร็จ",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    } else if (result.isDenied) {
      localStorage.setItem("docno1", "");
      Swal.fire({
        icon: "success",
        title: "ลงชื่อออกสำเร็จ",
        text: "ออกจากระบบแล้ว",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "about:blank";
        }
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("การดำเนินการถูกยกเลิก", "", "info");
    }
  });
}

// แดชบอร์ด
document.addEventListener("DOMContentLoaded", function () {
  // Define the API endpoint
  var gas =
    "https://script.google.com/macros/s/AKfycbw38l4dx3_L-ljv1NRMBC-yqx3OXdscgatTSTJly3crOUAYGrM8n2CkJObLbtgNjeCaHA/exec";

  // Select the element with id "utimeline"
  var utimelineElement = document.getElementById("utimeline");
  var sumdataElement = document.getElementById("sumdata");

  // Fetch data from the server
  fetch(gas)
    .then((response) => response.json())
    .then((data) => {
      if (data.cc && data.cc.length > 0) {
        // Assuming the server response has a property named 'cc' and each item has 'total'
        var timelineData = data.cc.map((item) => `${item.total}`).join(", ");
        // console.log(timelineData);
        var sumdatt = data.cc.map((item) => item.cnumber); // ดึงค่า cnumber ออกมาจากทุกๆ item ในอาร์เรย์ cc
        var totalSum = sumdatt.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ); // รวมค่าทั้งหมดในอาร์เรย์ sumdatt
        //   console.log(totalSum - 1); // แสดงผลรวมทั้งหมด
        // Set the text content of the element with the fetched data
        utimelineElement.innerText = timelineData;
        sumdataElement.innerText = `จำนวนผู้ลงทะเบียน ${totalSum - 1} คน`;
      } else {
        var timelineData = `ผิดพลาด!`;
        utimelineElement.innerText = timelineData;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle fetch errors here
    });
});

// line 1654797991-oDWLGzLM
// localhost 1654797991-AzLnmKne
async function main() {
  // hideLoading() ;
  await liff.init({ liffId: "1654797991-oDWLGzLM" });
  if (liff.isLoggedIn()) {
    getProfile();
  } else {
    liff.login();
  }
}

async function fetchInputOptions() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxqDazVhojy3PDLD2asS6Dp2dh-5zqiE9SVJr15BBh2nddc00ehKQNTC7_H1KXM6EhJFA/exec"
    );
    const data = await response.json();
    const inputOptions = {};
    data.category.forEach((category) => {
      inputOptions[category.id] = category.name;
    });
    return inputOptions;
  } catch (error) {
    console.error("Error fetching input options:", error);
    return {};
  }
}

async function fetchSubcategoryOptions(categoryId) {
  try {
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbwYUMzfkbM_B2fdgoGaJ7QKx_ACzg7cr0jn8I_x9yJdqHyWLurD_4IE5uX9tu_DW98/exec?categories=${categoryId}`
    );
    const data = await response.json();
    return data.category.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
    }));
  } catch (error) {
    console.error("Error fetching subcategory options:", error);
    return [];
  }
}

async function loadSubdatas(category, subcategory) {
  try {
    const response = await fetch(
      `https://script.google.com/macros/s/AKfycbxl6u1AXit5xEiSFk7lYOeGnruAE7DER2whjtmzTDcGu6Q6Foc-9zCYMrRmZDp4Ksb4/exec?mainname=${category}&subname=${subcategory}`
    );
    const data = await response.json();
    return data.datas.map((subdatas) => ({
      maincode: subdatas.mainmain,
      subcode: subdatas.submain,
      amphor: subdatas.db3,
    }));
  } catch (error) {
    console.error("Error fetching subcategory options:", error);
    return [];
  }
}

// app.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/nurse/service-worker.js")
      .then((registration) => {
        //   console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        //    console.error('Service Worker registration failed:', error);
      });
  });
}

// Captcha

let captchaText = "";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateCaptcha() {
  // Generate a random string
  captchaText = Math.random().toString(36).substring(2, 8).toUpperCase();
  //   console.log('Generated CAPTCHA:', captchaText); // Log CAPTCHA text
}

function drawCaptcha(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "30px Arial";
  for (let i = 0; i < captchaText.length; i++) {
    ctx.fillStyle = getRandomColor();
    ctx.fillText(captchaText[i], 30 * i + 10, 35);
  }
}
