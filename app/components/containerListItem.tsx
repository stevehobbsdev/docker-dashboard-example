import * as React from 'react'
import * as classNames from 'classnames'
import * as io from 'socket.io-client'

const socket = io.connect()

export interface Container {
    id: string
    name: string
    image: string
    state: string
    status: string
}

export class ContainerListItem extends React.Component<Container, {}> {

    onActionButtonClick() {
        const evt = this.isRunning() ? 'container.stop' : 'container.start'
        socket.emit(evt, { id: this.props.id })
    }

    isRunning() {
        return this.props.state === 'running'
    }

    render() {
        const panelClass = this.isRunning() ? 'success' : 'default'
        const classes = classNames('panel', `panel-${panelClass}`)
        const buttonText = this.isRunning() ? 'Stop' : 'Start'

        return (
            <div className="col-sm-3">
                <div className={ classes }>
                    <div className="panel-heading">{ this.props.name }</div>
                    <div className="panel-body">
                        Status: {this.props.status}<br/>
                        Image: {this.props.image}
                    </div>
                    <div className="panel-footer">
                        <button onClick={this.onActionButtonClick.bind(this)} className="btn btn-default">{buttonText}</button>
                    </div>
                </div>
            </div>
        )
    }
}