import type { Edge, Pool, Vertice } from '../types'
import { getVerticeKey } from './vertice'

export function getNeighbour(e: Edge, v: Vertice): Vertice {
  return e.vertice0.currency.equals(v.currency) ? e.vertice1 : e.vertice0
}

export function getEdgeKey(p: Pool, vertA: Vertice, vertB: Vertice): string {
  const [vert0, vert1] = vertA.currency.sortsBefore(vertB.currency) ? [vertA, vertB] : [vertB, vertA]
  return `${getVerticeKey(vert0)}-${getVerticeKey(vert1)}-${p.getId()}`
}
