import { Add, Clear } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import Dropzone from "react-dropzone";

export default class File extends Component {
  state = {
    uploadedFiles: [],
    uploading: false,
    error: "",
  };

  onDrop = (files) => {
    this.setState({
      uploading: true,
    });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios
      .post(`http://localhost:5000/images/uploadimage`, formData, {
        headers: {
          // "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        this.setState(
          {
            uploading: false,
            uploadedFiles: [
              ...this.state.uploadedFiles,
              response.data,
            ],
          },
          () => {
            this.props.imagesHandler(this.state.uploadedFiles);
          }
        );
      });
  };

  onRemove = (id) => {
    axios
      .post(
        `http://localhost:5000/images/removeimage?public_id=${id}`,
        //formData,
        {
          headers: {
            //"content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        let images = this.state.uploadedFiles.filter((item) => {
          return item.public_id !== id;
        });

        this.setState(
          {
            uploadedFiles: images,
          },
          () => {
            this.props.imagesHandler(images);
          }
        );
      });
  };

  showUploadedImages = () => {
    return this.state.uploadedFiles.map((item) => (
      <div
        className="dropzone_box"
        style={{ margin: "3px" }}
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{
            background: `url(${item.url}) no-repeat`,
            width: "150px",
            height: "150px",
            backgroundSize: "cover",
            color: "white",
          }}
        >
          <Clear />
        </div>
      </div>
    ));
  };

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: [],
      });
    }
    return null;
  }

  render() {
    return (
      <>
        {this.state.error && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {this.state.error}
          </p>
        )}
        <div
          style={{
            display: "flex",
            padding: "20px",
            height: "150px",
            border: "1px dotted black",
          }}
        >
          <section>
            <div
              className="dropzone clear"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {this.showUploadedImages()}
              </div>
              {this.state.uploading ? (
                <div
                  className="dropzone_box"
                  style={{
                    textAlign: "center",
                    paddingTop: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      style={{ color: "#00bcd4" }}
                      thickness={7}
                    />
                  </div>
                </div>
              ) : null}

              <Dropzone
                onDrop={(e) => this.onDrop(e)}
                multiple={false}
                className="dropzone_box"
                style={{
                  backgroundColor: "#f94144",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "150px",
                  width: "150px",
                  padding: "10px",
                }}
              >
                Click + to add image.
                <div>
                  <Add />
                </div>
              </Dropzone>
            </div>
          </section>
        </div>
      </>
    );
  }
}
