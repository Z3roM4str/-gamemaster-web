import { DepthDriver } from './art/DepthDriver';
import { BasinField, RidgeField, TerrainField } from './art/Fields';

/**
 * The page-scale rear world.
 *
 * A single fixed composition sitting behind the entire document: black void,
 * one blue terrain drifting slowly against page progress, one compressed basin
 * further back. Because it is fixed and continuous, every section is a
 * different window onto the same artwork instead of its own decorated box.
 */
export function SiteArt() {
  return (
    <>
      <DepthDriver />
      <div className="pageField" aria-hidden="true">
        <div className="pageFieldVoid" />
        <div className="pageFieldBasin">
          <BasinField />
        </div>
        <div className="pageFieldTerrain">
          <TerrainField />
        </div>
        <div className="pageFieldHorizon">
          <RidgeField />
        </div>
        <div className="pageFieldAperture" />
      </div>
    </>
  );
}
