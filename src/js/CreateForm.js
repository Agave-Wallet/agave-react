import React from 'react';
import Card from './Card';
import '../css/Card.css';
import DeckCreateForm from './DeckCreateForm';
import CardCreateForm from './CardCreateForm';

class CreateForm extends React.Component {
    render(){

        return(
            
            <div className = "pageContent">
                { this.props.page === "Deck" ? (
                    // If its deck creation
                    <DeckCreateForm />
                ) : (
                    // If its  card creation
                    // <CardCreationForm/>
                    <CardCreateForm />
                )}

                   
            </div>
        )
    }
}

export default CreateForm;