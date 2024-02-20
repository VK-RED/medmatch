import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { InterviewCardProps } from "@/lib/types"
  


export const InterviewCard = ({title}:InterviewCardProps) => {
    return (
        <Card className="border-2 cursor-pointer shadow-xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      </Card>
      
    )
}