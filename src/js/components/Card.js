import React from 'react';
import '../../css/Card.css';
import '../../css/Page.css'


class Card extends React.Component{
    static defaultProps = {
        name: 'John Smith',
        deckName: "Deck",
        issueMode: 'Multi Issue Mode',
        decimal: 0.5,
        cost: 50
    };
    render(){
        return(
            <div className = "Card">
                <p className="Card-p">{this.props.name}</p>
                <p className="Card-p">{this.props.deckName}</p>
                <p className="Card-p">{this.props.mode}</p>
                <p className="Card-p">{this.props.decimal}</p>
                {/* <p className="Card-p">{this.props.cost}</p> */}
                {/* TODO: Send transaction not clickable until transaction signed */}
                <button className="button-sendTransaction">Send Transaction</button>
            </div>
        )
    }
}

export default Card;