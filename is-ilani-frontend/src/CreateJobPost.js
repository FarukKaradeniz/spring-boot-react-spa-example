import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateJobPost extends React.Component {
  state = {
    baslik: "",
    is_tanimi: "",
    beklentiler: "",
    aktiflik: false,
    sonBasvuruZamani: new Date().setDate(new Date().getDate() + 1)
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(
      this.state.baslik,
      this.state.is_tanimi,
      this.state.beklentiler,
      this.state.aktiflik,
      this.state.sonBasvuruZamani
    );

    console.log(new Date(1563021246817).getDate());
  };

  render() {
    return (
      <div
        className="text-center"
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div style={{ width: "50%" }}>
          <h2 style={{ fontWeight: "bold" }}>Cretezxds</h2>
          <br />
          <form onSubmit={this.onFormSubmit}>
            <Form.Group controlId="baslik">
              <Form.Control
                value={this.state.baslik}
                onChange={e => this.setState({ baslik: e.target.value })}
                type="text"
                placeholder="Başlığı girin"
              />
            </Form.Group>

            <Form.Group controlId="is_tanimi">
              <Form.Control
                value={this.state.is_tanimi}
                onChange={e => this.setState({ is_tanimi: e.target.value })}
                placeholder="İş tanımı"
              />
            </Form.Group>
            <Form.Group controlId="beklentiler">
              <Form.Control
                value={this.state.beklentiler}
                onChange={e => this.setState({ beklentiler: e.target.value })}
                placeholder="Beklentiler"
                as="textarea"
                rows="6"
              />
            </Form.Group>
            <Form.Group controlId="aktiflik">
              <Form.Check
                value={this.state.aktiflik}
                onClick={e => this.setState({ aktiflik: e.target.checked })}
                type="checkbox"
                label="Aktiflik Durumu"
              />
            </Form.Group>
            <Form.Group controlId="sonBasvuruZamani">
              <DatePicker
                selected={this.state.sonBasvuruZamani}
                onChange={e => this.setState({ sonBasvuruZamani: e })}
                dateFormat="dd/MM/yyyy"
                minDate={new Date().setDate(new Date().getDate() + 1)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Oluştur
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
