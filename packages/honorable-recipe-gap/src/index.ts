function resolveGap(multiplier = 16) {
  return (props: any) => typeof props.gap === 'number' && ({ gap: props.gap * multiplier })
}

export default resolveGap
