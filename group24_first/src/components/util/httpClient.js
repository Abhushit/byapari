import axios from "axios";

const BaseURL = process.env.REACT_APP_BASE_URL;
const http = axios.create({
  baseURL: BaseURL,
  responseType: "json",
});

const getHeaders = (isSecure) => {
  let options = {
    "Content-Type": "application/json",
  };
  if (isSecure) {
    options["Authorization"] = localStorage.getItem("token");
  }
  return options;
};

function GET(url, isSecure = false, params = {}) {
  //   http
  //     .get(url, {
  //       headers: getHeaders(),
  //       params,
  //     })
  //     .then((data) => {
  //       console.log("success in http client >>", data);
  //     })
  //     .catch((err) => {
  //       console.log("error in http client >>", err);
  //     });
  return http.get(url, {
    headers: getHeaders(isSecure),
    params,
  });
}

function POST(url, data, isSecure = false, params = {}) {
  //   return new Promise((resolve, reject) => {
  //     http
  //       .post(url, data, {
  //         headers: getHeaders(),
  //         params,
  //       })
  //       .then((response) => {
  //         resolve(response);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  return http.post(url, data, {
    headers: getHeaders(isSecure),
    params,
  });
}

function DELETE(url, isSecure = false, params = {}) {
  return http.delete(url, {
    headers: getHeaders(isSecure),
    params,
  });
}
function PUT(url, data, isSecure = false, params = {}) {
  return http.put(url, data, {
    headers: getHeaders(isSecure),
    params,
  });
}

function UPLOAD(method, url, data, files, params = {}) {
  //send request to server using xml http request
  return new Promise((resolve, reject) => {
    // send request to server using xml http request
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    if (files && files.length) {
      // console.log("files are>>", files);
      for (let i = 0; i < files.length; i++) {
        formData.append("img", files[i], files[i].name);
      }
    }
    console.log('form data uplod>>', formData);

    // add each data in formdata
    for (let key in data) {
      formData.append(key, data[key]);
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        // console.log('req res cycle completed');
        // console.log('response is here >>', xhr.response);
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };

    xhr.open(
      method,
      `${BaseURL}${url}?token=${localStorage.getItem("token")}`,
      true
    );
    xhr.send(formData);
  });
}






export default {
  GET,
  POST,
  DELETE,
  PUT,
  UPLOAD,
};
