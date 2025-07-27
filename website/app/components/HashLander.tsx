interface HashLanderProps {
  id: string
}

function HashLander({ id }: HashLanderProps) {
  return (
    <div className="h-[1px] absolute -mt-20" id={id} />
  )
}

export default HashLander