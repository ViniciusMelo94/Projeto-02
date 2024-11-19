import './table.css'

export function Table(props) {
    return <table className="table" {...props}/>
}

export const TableHeader = (props) => <thead {...props}/>

export const TableHead = (props) => (
    <th align="left" className="tableHead" {...props}/>
)

export const TableBody = (props) => <tbody {...props}/>

export const TableRow = (props) => <tr className="tableRow" {...props} />

export const TableCell = (props) => (
    <td className="tableCell" {...props} />
)