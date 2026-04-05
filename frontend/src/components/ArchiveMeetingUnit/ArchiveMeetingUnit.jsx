import "./ArchiveMeetingUnit.scss";

function archiveMeetingUnit({name, date}) {
    return (
        <div className="archiveMeetingUnit__card">
            <div className="archiveMeetingUnit__card-info">
                <h3 className="archiveMeetingUnit__card-info-name">{name}</h3>
                <p className="archiveMeetingUnit__card-info-date">{date}</p>
            </div>
            <button className="archiveMeetingUnit__card-see-more-btn">Детальна інформація</button>
        </div>
    );
}

export default archiveMeetingUnit;