import "./ShelveInput.scss";
import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";



class ShelveInput extends React.Component {

    state = {
        status: "",
        statusMissing: true,
        selected: this.props.singleUserBook.status,
        notes: this.props.singleUserBook.notes
    }


    // filteredBook = () => {
    //     const booksList = this.props.booksList;

    //     const bookId = this.props.routerProps.match.params.id;
    //     let bookFiltered = booksList.filter(book => bookId == book.primary_isbn10);
    //     console.log(bookFiltered);

    //     return bookFiltered

    // }


    handleChange = (event) => {

        const bookId = this.props.routerProps.match.params.bookId;
        const userId = this.props.routerProps.match.params.id;
      

        const book = this.props.singleUserBook;

        if (event.target.name === "status") {
            this.setState({
                status: event.target.value,
                statusMissing: false,
                selected: event.target.value
            })
        }

        let currentUserId;

        const tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
        currentUserId = tokenDecoded.id;
       
        try {

      
            axios.put(`http://localhost:8080/users/${userId}/${bookId}`, {
                author: book.author,
                status: event.target.value,
                book_image: book.book_image,
                user_id: currentUserId,
                description: book.description,
                primary_isbn10: bookId,
                rank: book.rank,
                title: book.title,
                notes: book.notes

            })
                .then(() => { this.props.shelveChangeHandler() })

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