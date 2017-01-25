import * as React from 'react'

interface ModalProperties {
    id: string
    title: string
    buttonText?: string
    onButtonClicked?: () => boolean|undefined
}

export default class Modal extends React.Component<ModalProperties, {}> {

    modalElementId: string

    constructor(props: ModalProperties) {
        super(props)
        this.modalElementId = `#${this.props.id}`
    }

    onPrimaryButtonClick() {
        if (this.props.onButtonClicked) {
            if (this.props.onButtonClicked() !== false) {
                $(this.modalElementId).modal('hide')
            }
        }
    }

    render() {
        return (
            <div className="modal fade" id={ this.props.id }>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title">{ this.props.title }</h4>
                        </div>
                        <div className="modal-body">
                            { this.props.children }
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                onClick={this.onPrimaryButtonClick.bind(this)}
                                className="btn btn-primary">{ this.props.buttonText || "Ok" }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}