import "./StateInput.scss";
import React from "react";
import axios from "axios";



class StateInput extends React.Component {

    state = {
        status: "",
        statusMissing: true
    }


    filteredBook = (props) => {
        const booksList = this.props.booksList;

        const bookId = this.props.routerProps.match.params;
        let bookFiltered = booksList.filter(book => bookId == book.primary_isbn10);
        console.log(bookFiltered);

        return bookFiltered

    }


    handleChange = (event) => {

        const bookId = this.props.routerProps.match.params.id;

        const books = this.props.booksList;

        if (event.target.name === "status") {
            this.setState({
                status: event.target.value,
                statusMissing: false
            })
        }

        const bookFound = this.filteredBook();

        console.log(bookFound.length);

        if (bookFound.length === 0) {
            try {
                console.log(this.props.booksList);
                console.log(bookId);
                const newFilteredBook = this.props.booksList.find(book => bookId == book.primary_isbn10);
                console.log(newFilteredBook);

                axios.post("http://localhost:8080/videos", {
                    status: event.target.status.value,
                    user_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
                    author: "David Baldacci",
                    book_image: "",
                    description: "When his ex-girlfriend turns up dead in his office building, an entry-level investment analyst delves into the halls of economic power.",
                    primary_isbn10: "1538719843",
                    rank: "",
                    title: "THE 6:20 MAN",
                    notes: ""


                })
                    .then(() => { this.props.statusChangeHandler() })

            } catch {
                console.log("error");
            }
        }

    }

    render() {
        console.log(this.props);


        return (
            <div className="state__field">
                <p>Shelves:</p>

                <fieldset className="state__container" >
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="reading" name="status" className="field__input" value="Reading" />
                        <label htmlFor="reading" className="field__label">
                            Reading
                        </label>
                    </div>
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="wishList" name="status" className="field__input" value="Wish List" />
                        <label htmlFor="wishList" className="field__label">
                            Wish List
                        </label>
                    </div>
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="finished" name="status" className="field__input" value="Finished" />
                        <label htmlFor="finished" className="field__label">
                            Finished
                        </label>
                    </div>
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="dropped" name="status" className="field__input" value="Dropped" />
                        <label htmlFor="dropped" className="field__label">
                            Dropped
                        </label>
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default StateInput;