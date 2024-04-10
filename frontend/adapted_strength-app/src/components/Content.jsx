import React from "react";
import { onMessageListener } from "../firebase";
/** Notification released*/
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notficList: localStorage.getItem('notficList') == null ? [] : localStorage.getItem('notficList'),
            announList: localStorage.getItem('announList') == null ? [] : localStorage.getItem('announList'),
            type: ""
        };
    }

    componentDidMount() {
        this.setState({ notficList: JSON.parse(localStorage.getItem('notficList')) == null ? [] : JSON.parse(localStorage.getItem('notficList')) });
        this.setState({ announList: JSON.parse(localStorage.getItem('announList')) == null ? [] : JSON.parse(localStorage.getItem('announList')) });
        this.setState({ type: this.props.type });
    }
    componentDidUpdate(previousProps) {
        if (previousProps.notficList !== this.props.notficList) {
            this.setState({ notficList: this.props.notficList });
        }

        if (previousProps.announList !== this.props.announList) {
            this.setState({ announList: this.props.announList });
        }

        if (previousProps.type !== this.props.type) {
            this.setState({ type: this.props.type });
        }
    }
    clearAllMessage = () => {
        if (this.props.type == "announcement") {
            localStorage.removeItem('announList')
        }
        else {
            localStorage.removeItem('notficList')
        }
    };
    generateDate = timeStamp => {
        const d = new Date(timeStamp * 1000);
        const n = d.getDate();
        const m = d.getMonth();
        const monthNames = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ];
        return { date: `${n} ${monthNames[m]}`, time: timeStamp };
    };

    render() {
        const { type, notficList, announList } = this.state;
        let listItems = [];
        if (type === 'notification') {
            listItems = notficList;
        }
        else if (type === 'announcement') {
            listItems = announList;
        }
        let totalCount = 0;
        onMessageListener().then(payload => {
            var title = payload.notification.title + "";
            console.log(title)
            var evType = title.split('|')[1].trim();
            title = title.split('|')[0].trim();
            if (evType.toLocaleLowerCase() === 'announcement') {
                listItems.push({
                    UTC: Math.floor(new Date().getTime() / 1000),
                    //                    UTC: Math.floor(new Date().getTime() / 1000) - new Date().getTimezoneOffset() * 60,
                    list: [
                        {
                            type: title,
                            content: payload.notification.body,
                            timestamp: new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })
                        }
                    ]
                }
                )
                this.setState(() => ({ announList: listItems }));
                localStorage.setItem('announList', JSON.stringify(listItems));
            }
            else {
                listItems.push({
                    UTC: Math.floor(new Date().getTime() / 1000) - new Date().getTimezoneOffset() * 60,
                    list: [
                        {
                            type: title,
                            content: payload.notification.body,
                            timestamp: new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })
                        }
                    ]
                }
                )
                this.setState(() => ({ notficList: listItems }));
                localStorage.setItem('notficList', JSON.stringify(listItems));
            }
            // console.log(payload);
            // console.log(listItems)
        }).catch(err => console.log('failed: ', err));

        // sort list based on timestamp descending order
        listItems = listItems.sort((a, b) => parseInt(b.UTC) > parseInt(a.UTC) ? b : a);
        // console.log("List: "+JSON.stringify(listItems));

        let allTimestamp = [];
        listItems.map((i, k) => {
            const test = allTimestamp.filter(
                item => item.UTC.date === this.generateDate(i.UTC).date
            );
            if (test.length === 0) {
                const itemObj = {
                    UTC: this.generateDate(i.UTC),
                    list: []
                };
                allTimestamp.push(itemObj);
            }
            totalCount = totalCount + i.list.length;
        });
        listItems.map((i, j) => {
            const iUTC = this.generateDate(i.UTC).date;
            const sameData = allTimestamp.filter(function (k) {
                return k.UTC.date === iUTC;
            });
            const key = sameData.length && sameData[0].UTC.date;
            allTimestamp.map(item => {
                if (item.UTC.date === key) {
                    i.list.map(p => {
                        p.timeStamp = i.UTC;
                    });
                    item.list.push(i.list);
                }
            });
        });

        allTimestamp = allTimestamp.sort((a, b) => parseInt(b.UTC.time) > parseInt(a.UTC.time) ? b : a);
        // console.log("List> "+JSON.stringify(allTimestamp));

        return (
            <div className={"notification"} style={listItems.length !== 0 ? {} : { display: 'none' }}>
                <div
                    style={{
                        position: "inherit",
                        width: "90%",
                        maxHeight: "700px",
                        border: "0.5px solid #8080803d",
                        minHeight: "100px",
                        overflow: "auto",
                        // top: "30px"
                    }}
                    className={"notificationBar"}
                >
                    {allTimestamp.map((i, k) => {
                        return (
                            <div>
                                <p
                                    style={{
                                        fontSize: "13px",
                                        margin: "5px 0",
                                        textAlign: "left",
                                        color: "#747474",
                                        display: "initial"
                                    }}
                                >
                                    <span style={{ display: "inline-block", width: "50%" }}>
                                        {i.UTC.date}
                                    </span>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            width: "50%",
                                            textAlign: "right"
                                        }}
                                    >

                                    </span>
                                </p>
                                {i.list.map(l => {
                                    return l.map(k => {
                                        const d = new Date(k.timeStamp * 1000);
                                        const min = d.getUTCMinutes();
                                        const hours = d.getUTCHours() % 12 || 12;
                                        const amOrpm = hours >= 12 ? "pm" : "am";
                                        return (
                                            <div
                                                style={{ background: "#fff", padding: "5px" }}
                                                className={"lineItmes"}
                                            >
                                                <span
                                                    style={{ fontSize: "16px", fontWeight: 700 }}
                                                >{`${k.type}`}</span>
                                                <span
                                                    style={{
                                                        fontSize: "13px",
                                                        fontWeight: 700,
                                                        color: "#747474",
                                                        float: "right"
                                                    }}
                                                >
                                                    {`${hours} ${min} ${amOrpm}`}
                                                </span>
                                                <div style={{ fontSize: "16px" }}>{k.content}</div>
                                            </div>
                                        );
                                    });
                                })}
                            </div>
                        );
                    })}
                </div>
                <button style={{ margin: '10px', float: 'center' }} onClick={this.clearAllMessage}>Clear All</button>
            </div>
        );
    }
}

export default Content;