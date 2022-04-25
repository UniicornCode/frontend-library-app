import React from 'react';
import {Link} from "react-router-dom";

const bookTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.author.name}</td>
            <td>{props.term.availableCopies}</td>
            <td>
                <Link className={"btn btn-block btn-dark mx-1"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                <button className={"btn btn-block btn-danger mx-1"}
                      onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </button>
                <button className={"btn btn-block btn-info mx-1"}
                      onClick={() => props.onMark(props.term.id)}>
                    Mark as taken
                </button>
            </td>
        </tr>
    )
}

export default bookTerm;