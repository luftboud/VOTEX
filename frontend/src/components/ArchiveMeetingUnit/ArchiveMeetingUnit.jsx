import {Link} from "react-router-dom";
import "./ArchiveMeetingUnit.scss";

function archiveMeetingUnit({id, name, date}) {
    return (
        <div className="archiveMeetingUnit__card">
            <div className="archiveMeetingUnit__card-info">
                <h3 className="archiveMeetingUnit__card-info-name">{name}</h3>
                <p className="archiveMeetingUnit__card-info-date">{date}</p>
            </div>
            <Link className="archiveMeetingUnit__card-see-more-btn" to={`/archive/${id}`}>Детальна інформація</Link>
        </div>
    );
}

export default archiveMeetingUnit;