import { useParams } from "react-router-dom"
import Container from "@/components/layout/Container"
import CreateBlogForm from "@/features/blog/components/CreateBlogForm"

function EditBlogPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <Container>
        <div className="py-12 text-center">
          <p className="text-lg text-destructive">Blog ID not found</p>
        </div>
      </Container>
    )
  }

  return <CreateBlogForm mode="edit" blogId={id} />
}

export default EditBlogPage
