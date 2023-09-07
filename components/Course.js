import styles from './course.module.css'

export default function Course({name, letterGrade, numberGrade, courseImage}) {
    return (
    <main>
        <div className={styles.courseContainer}>
        <img src={courseImage} className={styles.courseImage}/>
            <div className={styles.courseGrade}>
            {letterGrade} ({numberGrade}%)
            </div>
            <div className={styles.courseName}>
            {name}
            </div>
        </div>
    </main>
    )
}
