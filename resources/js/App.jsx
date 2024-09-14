import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import Config from "./Config";
import Swal from "sweetalert2";

const App = () => {
    const [url, setUrl] = useState("");

    const [urlsAcortadas, setUrlsAcortadas] = useState([]);

    const submitSetUrl = async (e) => {
        e.preventDefault();
        Config.setUrlShort(url)
            .then((response) => {
                if (response.data.status == false) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.data.message,
                    });
                    return;
                } else {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                        icon: "success",
                        title: response.data.message,
                        text: response.data.shortened,
                    });
                    console.log(response.data);
                    // Agrega la URL acortada a la lista
                    setUrlsAcortadas([...urlsAcortadas, response.data]);
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                });
                console.log(error);
                console.log(error.response.data);
            });
    };

    useEffect(() => {
        Config.getUrlShorteds()
            .then((response) => {
                setUrlsAcortadas(response.data.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container pt-5 ">
            <div className="card  shadow p-3 mb-5 bg-body-tertiary rounded">
                <div className="card-body">
                    <h5 className="card-title">Url Shorter 😎</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        Spot2mx
                    </h6>
                    <div className="row">
                        <div className="col col-md-10">
                            <div className="form-group">
                                <label htmlFor="url_base">
                                    Ingrese Url a acortar{" "}
                                </label>
                                <input
                                    id="url_base"
                                    className="form-control"
                                    placeholder="Ingrese Url a acortar"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                                <small
                                    id="emailHelp"
                                    className="form-text text-muted"
                                >
                                    Ejemplo de resultado :
                                    https://alfonzo.dev/example
                                </small>
                            </div>
                        </div>
                        <div className="col col-md-2 pt-4">
                            <button
                                onClick={submitSetUrl}
                                className="btn btn-primary mb-2"
                            >
                                Acortar
                            </button>
                        </div>
                    </div>
                </div>{" "}
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card  shadow p-3 mb-5 bg-body-tertiary rounded">
                        <div className="card-body">
                            <h5 className="card-title">
                                Cantidad de URLs: {urlsAcortadas.length}
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card  shadow p-3 mb-5 bg-body-tertiary rounded">
                        <div className="card-body">
                            <h5 className="card-title">URLs Acortadas</h5>
                            {urlsAcortadas.map((urlAcortada, index) => (
                                <ul
                                    key={index}
                                    className="list-group list-group-horizontal"
                                >
                                    <li className="list-group-item">
                                        {index + 1}
                                    </li>
                                    <li className="list-group-item w-75">
                                        {urlAcortada.url}
                                    </li>
                                    <li className="list-group-item w-75">
                                        {urlAcortada.shortened ?? (
                                            <a
                                                href={urlAcortada.shortened}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {/* {urlAcortada.url +
                                                    urlAcortada.slug} */}
                                                {urlAcortada.shortened}
                                            </a>
                                        )}
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
