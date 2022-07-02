import React, { useState, useEffect } from "react";

function Miscellaneous() {
  const [miscellaneousObj, setmiscellaneousObj] = useState({
    emp_id: "",
    gap_details: "",
    file: "",
    additional_info: "",
  });

  const handleChange = (e) => {
    const temp = miscellaneousObj;
    temp[e.target.name] = e.target.value;
    setmiscellaneousObj({ ...temp });
  };
  const getFromLocalStorage = () => {
    miscellaneousObj.emp_id = localStorage.getItem("emp_id");
  };
  useEffect(() => {
    getFromLocalStorage();
    getMiscDetails();
  }, []);

  const getMiscDetails = () => {
    return fetch(
      `http://localhost:4000/api/miscellaneous/getmiscellaneous/${miscellaneousObj.emp_id}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        response.json().then((data) => {
          console.log(data.user);
          if (data.user !== null) {
            setmiscellaneousObj({
              emp_id: miscellaneousObj.emp_id,
              gap_details: data.user.gap_details,
              file: data.user.file_doc,
              additional_info: data.user.additional_info,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("emp_id", miscellaneousObj.emp_id);
    formData.append("gap_details", miscellaneousObj.gap_details);
    formData.append("additional_info", miscellaneousObj.additional_info);
    for (let i = 0; i < files.files.length; i++) {
      formData.append("files", files.files[i]);
    }

    return fetch(`http://localhost:4000/api/miscellaneous/addmiscellaneous`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    })
      .then((response) => {
        getFromLocalStorage();
        getMiscDetails();
        response.json().then((data) => {
          alert(data.message);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body container-fluid ">
      <div className="card ">
        <div className="card-header fw-bold text-center">
          Miscellaneous Details
        </div>

        <div className="card-body">
          <div className="row ">
            <form className="pt-1" onSubmit={onSubmit}>
              <div className="m-2">
                <label className="form-label">Gap Details (if any):</label>
                <input
                  type="text"
                  className="form-control"
                  name="gap_details"
                  onChange={handleChange}
                  value={miscellaneousObj.gap_details}
                  required
                ></input>
              </div>
              <div className="m-2">
                <label for="formFileMultiple" class="form-label">
                  Miscellaneous Documents:
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="files"
                  // value={miscellaneousObj.file}
                  required
                ></input>
              </div>
              <div className="m-2">
                <label className="form-label">
                  Additional Information (if any):
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="additional_info"
                  onChange={handleChange}
                  value={miscellaneousObj.additional_info}
                  required
                ></input>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-success">
                  Save / Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Miscellaneous;
