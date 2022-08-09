import "./StateInput.scss";
import React from "react";
import axios from "axios";



class StateInput extends React.Component {

    state = {
        status: "",
        statusMissing: true
    }


    // filteredBook = () => {
    //     const booksList = this.props.booksList;

    //     const bookId = this.props.routerProps.match.params.id;
    //     let bookFiltered = booksList.filter(book => bookId == book.primary_isbn10);
    //     console.log(bookFiltered);

    //     return bookFiltered

    // }


    handleChange = (event) => {

        const bookId = this.props.routerProps.match.params.id;

        const books = this.props.booksList;
        console.log(event.target.value);

        if (event.target.name === "status") {
            this.setState({
                status: event.target.value,
                statusMissing: false
            })
        }

        // const bookFound = this.filteredBook();




        try {

            const newFilteredBook = books.find(book => bookId == book.primary_isbn10);
            console.log(newFilteredBook);

            axios.post("http://localhost:8080/books", {
                author: newFilteredBook.author,
                status: event.target.value,
                book_image: newFilteredBook.book_image,
                user_id: this.props.userId,
                description: newFilteredBook.description,
                primary_isbn10: bookId,
                rank: newFilteredBook.rank,
                title: newFilteredBook.title,
                notes: ""

            })
                .then(() => { this.props.statusChangeHandler() })

        } catch {
            console.log("error");
        }


    }

    render() {
        console.log(this.props);


        return (
            <div className="state__field">
                <p className="first-word">Shelves:</p>

                <fieldset className="state__container" >
                    <div className="state__container-wraper">
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
                    </div>
                    <div className="state__container-wraper">
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
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default StateInput;