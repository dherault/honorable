function resolveGap(multiplier = 16) {
  return (props: any) => {
    if (typeof props.gap === 'number') {
      return {
        gap: props.gap * multiplier,
      }
    }

    return {}
  }
}

export default resolveGap
