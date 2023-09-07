import Course from "@/components/Course"
import styles from './page.module.css'

async function getCourses() {
  const res = await fetch('https://canvas.asu.edu/api/v1/courses?include[]=total_scores&include[]=banner_image&include[]=course_image', {
    headers: {
      "Authorization": "Bearer 7236~cypT34bUyApr3KIkW7hK21M1zMgYf8RnmeV2lRJ6zUf7cwX5kpGbIbqnpL7SGBhw"
      // "Authorization": "Bearer 7236~a06daQ4k4g4KDUQ659GlRbEYEkBYB5BENAna7cLawk6wWKQtwQPs5F8EXNtGcbXp"
    }
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getProfile() {
  const res = await fetch("https://canvas.asu.edu/api/v1/users/self/profile", {
    headers: {
      "Authorization": "Bearer 7236~cypT34bUyApr3KIkW7hK21M1zMgYf8RnmeV2lRJ6zUf7cwX5kpGbIbqnpL7SGBhw"
      // "Authorization": "Bearer 7236~a06daQ4k4g4KDUQ659GlRbEYEkBYB5BENAna7cLawk6wWKQtwQPs5F8EXNtGcbXp"
    }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
export default async function Page() {
  const courseInfo = await getCourses()
  const userInfo = await getProfile()
  
  const courses = courseInfo.map((course, i) =>

      <Course 
      key ={i}
      name={course.name}
      letterGrade={course.enrollments[0]?.computed_current_grade ? course.enrollments[0].computed_current_grade : "Current grade unavailable"}
      numberGrade={course.enrollments[0].computed_current_score}
      courseImage={course.image_download_url?.replace("download=1", "download=0")}
      />
      )
      console.log(courses[4])
  return (
    <main>
      <h1>Canvas Grades For {userInfo.name}</h1>
      <div className={styles.courseContainer}>
      {courses}
      </div>
    </main>
  )
}