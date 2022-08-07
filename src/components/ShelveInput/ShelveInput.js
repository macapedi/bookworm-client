import "./ShelveInput.scss";
import React from "react";
import axios from "axios";



class ShelveInput extends React.Component {

    state = {
        status: "",
        statusMissing: true,
        selected: this.props.singleUserBook.status
    }


    // filteredBook = () => {
    //     const booksList = this.props.booksList;

    //     const bookId = this.props.routerProps.match.params.id;
    //     let bookFiltered = booksList.filter(book => bookId == book.primary_isbn10);
    //     console.log(bookFiltered);

    //     return bookFiltered

    // }


    // handleChange = (event) => {

    //     const bookId = this.props.routerProps.match.params.id;

    //     const books = this.props.booksList;
    //     console.log(event.target.value);

    //     if (event.target.name === "status") {
    //         this.setState({
    //             status: event.target.value,
    //             statusMissing: false,
    //             selected: event.target.value
    //         })
    //     }

        // const bookFound = this.filteredBook();




    //     try {

    //         const newFilteredBook = books.find(book => bookId == book.primary_isbn10);
    //         console.log(newFilteredBook);

    //         axios.put("http://localhost:8080/books", {
    //             author: newFilteredBook.author,
    //             status: event.target.value,
    //             book_image: newFilteredBook.book_image,
    //             user_id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
    //             description: newFilteredBook.description,
    //             primary_isbn10: bookId,
    //             rank: newFilteredBook.rank,
    //             title: newFilteredBook.title,
    //             notes: ""

    //         })
    //             .then(() => { this.props.statusChangeHandler() })

    //     } catch {
    //         console.log("error");
    //     }


    // }

    render() {
        console.log(this.props);


        return (
            <div className="state__field">
                <p>Shelves:</p>

                <fieldset className="state__container" >
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="reading" name="status" className="field__input" value="Reading" defaultChecked={this.state.selected === "Reading"} />
                        <label htmlFor="reading" className="field__label">
                            Reading
                        </label>
                    </div>
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="wishList" name="status" className="field__input" value="Wish List" defaultChecked={this.state.selected === "Wish List"} />
                        <label htmlFor="wishList" className="field__label">
                            Wish List
                        </label>
                    </div>
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="finished" name="status" className="field__input" value="Finished" defaultChecked={this.state.selected === "Finished"}/>
                        <label htmlFor="finished" className="field__label">
                            Finished
                        </label>
                    </div>
                    <div className="state__wraper">

                        <input onChange={this.handleChange} type="radio" id="dropped" name="status" className="field__input" value="Dropped" defaultChecked={this.state.selected === "Dropped"}/>
                        <label htmlFor="dropped" className="field__label">
                            Dropped
                        </label>
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default ShelveInput;