import * as React from 'react'
import { Container, ContainerListItem } from './containerListItem'
import { ContainerList } from './containerList'
import * as _ from 'lodash'
import * as io from 'socket.io-client'

let socket = io.connect()

class AppState {
    containers?: Container[]
    stoppedContainers?: Container[]
}

export class AppComponent extends React.Component<{}, AppState> {

    constructor() {
        super()
        this.state = {
            containers: [],
            stoppedContainers: []
        }

        socket.on('containers.list', (containers: any) => {

            const partitioned = _.partition(containers, (c: any) => c.State == "running")

            this.setState({
                containers: partitioned[0].map(this.mapContainer),
                stoppedContainers: partitioned[1].map(this.mapContainer)
            })
        })
    }

    mapContainer(container:any): Container {
        return {
            id: container.Id,
            name: _.chain(container.Names)
                .map((n: string) => n.substr(1))
                .join(", ")
                .value(),
            state: container.State,
            status: `${container.State} (${container.Status})`,
            image: container.Image
        }
    }

    componentDidMount() {
        socket.emit('containers.list')
    }

    render() {
        return (
            <div className="container">
                <h1 className="page-header">Docker Dashboard</h1>
                
                <ContainerList title="Running" containers={this.state.containers} />
                <ContainerList title="Stopped containers" containers={this.state.stoppedContainers} />
            </div>
        )
    }
}