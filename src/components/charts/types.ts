export type DataItem = {
//   id?: string;
//   parentId?: string;
//   children?: DataItem[];
  id_trim: number;
  make: string;
  model: string;
  generation: string;
  year_from: number;
  year_to?: number;
  series?: string;
  trim?: string;
  body_type?: string;
  load_height_mm?: number;
  number_of_seats?: number;
  length_mm?: number;
  width_mm?: number;
  height_mm?: number;
  wheelbase_mm?: number;
  front_track_mm?: number;
  rear_track_mm?: number;
  curb_weight_kg?: number;
  wheel_size_r14?: boolean;
  ground_clearance_mm?: number;
  trailer_load_with_brakes_kg?: number;
  payload_kg?: number;
  back_track_width_mm?: number;
  front_track_width_mm?: number;
  clearance_mm?: number;
  full_weight_kg?: number;
  front_rear_axle_load_kg?: string;
  max_trunk_capacity_l?: number;
  cargo_compartment_volume_mm3?: number;
  cargo_volume_m3?: number;
  minimum_trunk_capacity_l?: number;
  maximum_torque_n_m?: number;
  injection_type?: string;
  overhead_camshaft?: string;
  cylinder_layout?: string;
  number_of_cylinders?: number;
  compression_ratio?: string;
  engine_type?: string;
  valves_per_cylinder?: number;
  boost_type?: string;
  cylinder_bore_mm?: number;
  stroke_cycle_mm?: number;
  engine_placement?: string;
  cylinder_bore_and_stroke_cycle_mm?: string;
  turnover_of_maximum_torque_rpm?: number;
  max_power_kw?: number;
  presence_of_intercooler?: boolean;
  capacity_cm3?: number;
  engine_hp?: number;
  engine_hp_rpm?: number;
  drive_wheels?: string;
  bore_stroke_ratio?: string;
  number_of_gears?: number;
  turning_circle_m?: number;
  transmission?: string;
  mixed_fuel_consumption_per_100_km_l?: string;
  range_km?: string;
  emission_standards?: string;
  fuel_tank_capacity_l?: number;
  acceleration_0_100_km_h_s?: number;
  max_speed_km_per_h?: number;
  city_fuel_per_100km_l?: number;
  co2_emissions_g_km?: number;
  fuel_grade?: string;
  highway_fuel_per_100km_l?: number;
  back_suspension?: string;
  rear_brakes?: string;
  front_brakes?: string;
  front_suspension?: string;
  steering_type?: string;
  car_class?: string;
  country_of_origin?: string;
  number_of_doors?: number;
  safety_assessment?: string;
  rating_name?: string;
  battery_capacity_kw_per_h?: number;
  electric_range_km?: number;
  charging_time_h?: number;


  [key: string]: any; // for additional dynamic properties like color_attribute and size_attribute

};
// type GroupAggregate = {
//   items: DataItem[];
//   aggregate?: { [key: string]: any }; // Replace `any` with more specific types if possible
// }
// export type GroupedData = {
//   [key: string]: GroupAggregate;
// };

// export type AggregatedData = {
//   items: DataItem[];
//   aggregation: { [key: string]: any }; // Adjust according to the actual structure
// }

// export type GroupedData = {
//   [key: string]: AggregatedData;
// };

// Define the structure of your accumulator object groups
export type GroupedData = {
  [key: string]: DataItem[];
}

export type TreeVisualizationProps = {
  path?: (d: DataItem) => string[];
  id?: (d: DataItem) => string;
  parentId?: (d: DataItem) => string;
  children?: (d: DataItem) => DataItem[];
  tree?: d3.TreeLayout<DataItem>;
  sort?: (a: DataItem, b: DataItem) => number;
  label?: (data: DataItem, node: d3.HierarchyNode<DataItem>) => string;
  title?: (data: DataItem, node: d3.HierarchyNode<DataItem>) => string;
  link?: (data: DataItem, node: d3.HierarchyNode<DataItem>) => string;
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
  linkTarget?: string;
  width?: number;
  height?: number;
  r?: number;
  padding?: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeLinejoin?: CanvasLineJoin;
  strokeLinecap?: CanvasLineCap;
  halo?: string;
  haloWidth?: number;
  curve?: d3.CurveFactory;
  color_attribute?: string;
  size_attribute?: string;
};


export type TreeProps = {
  data: DataItem[];
  visualizationProps?: TreeVisualizationProps;
};