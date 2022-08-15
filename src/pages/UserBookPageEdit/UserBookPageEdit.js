import React from 'react';
import "./UserBookPageEdit.scss";
import axios from "axios";
import { Link } from 'react-router-dom';
import ShelveInput from '../../components/ShelveInput/ShelveInput';
import backIcon from '../../assets/icons/back.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import saveIcon from '../../assets/icons/save.svg';
import cancelIcon from '../../assets/icons/cancel.svg';

class UserBookPageEdit extends React.Component {
    state = {
        singleUserBook: "",
        notes: ""
    }


    async componentDidMount() {
        const userId = this.props.routerProps.match.params.id;
        const bookId = this.props.routerProps.match.params.bookId;


        const booksRequest = await axios.get('https://bookworm-capstone-api.herokuapp.com/books');

        const books = booksRequest.data;

        const singleUserBook = books.filter((book) => book.user_id == userId && bookId == book.primary_isbn10);

        this.setState({
            singleUserBook: singleUserBook[0],
            notes: singleUserBook[0].notes
        })

    }
    // async componentDidUpdate() {
    //   const userId = this.props.routerProps.match.params.id;
    //   const bookId = this.props.routerProps.match.params.bookId;


    //   const booksRequest = await axios.get("http://localhost:8080/books");

    //   const books = booksRequest.data;

    //   const singleUserBook = books.filter((book) => book.user_id == userId && bookId == book.primary_isbn10);

    //   this.setState({
    //     singleUserBook: singleUserBook[0]
    //   })

    // }



    shelveChangeHandler = async () => {

        const userId = this.props.routerProps.match.params.id;
        const bookId = this.props.routerProps.match.params.bookId;


        const booksRequest = await axios.get('https://bookworm-capstone-api.herokuapp.com/books');

        const books = booksRequest.data;

        const singleUserBook = books.filter((book) => book.user_id == userId && bookId == book.primary_isbn10);

        this.setState({
            singleUserBook: singleUserBook[0]
        })
    }

    cancelButtonHandler = () => {
        const userId = this.props.routerProps.match.params.id;
        const bookId = this.props.routerProps.match.params.bookId;
        this.props.routerProps.history.push(`/users/${userId}/${bookId}`);
    }




    notesClickHandler = async (e) => {
        const userId = this.props.routerProps.match.params.id;
        const bookId = this.props.routerProps.match.params.bookId;
        const singleUserBook = this.state.singleUserBook;


        try {

            axios.put(`https://bookworm-capstone-api.herokuapp.com/users/${userId}/${bookId}`, {
                author: singleUserBook.author,
                status: singleUserBook.status,
                book_image: singleUserBook.book_image,
                user_id: userId,
                description: singleUserBook.description,
                primary_isbn10: bookId,
                rank: singleUserBook.rank,
                title: singleUserBook.title,
                notes: this.state.notes,
            })
        } catch {
            console.log("error");
        }
        this.props.routerProps.history.push(`/users/${userId}/${bookId}`)
    }


    notesChangeHandler = async (e) => {
        if (e.target.name === "notes")
            this.setState({
                notes: e.target.value
            })
    }







    render() {

        const userId = this.props.routerProps.match.params.id;
        const currentUserId = "8";

        if (this.state.singleUserBook) {


            const { book_image, author, description, primary_isbn10, title, rank } = this.state.singleUserBook;



            return (
                <>       
                <div className='book-details'>
                    <div className='book-details__container'>
                        <img src={book_image} alt={title} className="book-details__image"></img>
                        <div>
                            <div className='book-details_text-wrapper'>
                                <p className='first-word'>Title: <span>{title}</span></p>
                                <p className='first-word'>Author: <span>{author}</span></p>
                                <p className='first-word'>Description: <span>{description}</span></p>

                                {userId == currentUserId && <ShelveInput shelveChangeHandler={this.shelveChangeHandler} routerProps={this.props.routerProps} singleUserBook={this.state.singleUserBook} />}
                            </div>
                            <div className='book-details__notes-bigcontainer'>
                                <p className='first-word'>Notes:</p>

                                <form>
                                    <div className='book-details__notes-container'>
                                        <textarea onChange={this.notesChangeHandler} className='book-details__notes-editor' name="notes" value={this.state.notes}></textarea>
                                    </div>
                                    <div className='book-details__button-container'>
                                        <button onClick={this.notesClickHandler} className="button"><img src={saveIcon} alt="save icon" className='icon'></img>Save</button>
                                        <button onClick={this.cancelButtonHandler} className="button"><img className='icon' src={cancelIcon} alt="cancel icon"></img>Cancel</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                </>
            );
        } else {
            <p>Loading...</p>
        }
    }
}


export default UserBookPageEdit;