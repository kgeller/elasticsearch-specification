/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Alias } from '@indices/_types/Alias'
import { DataStreamVisibility } from '@indices/_types/DataStream'
import { IndexSettings } from '@indices/_types/IndexSettings'
import { Dictionary } from '@spec_utils/Dictionary'
import { RequestBase } from '@_types/Base'
import {
  IndexName,
  Indices,
  Metadata,
  Name,
  VersionNumber
} from '@_types/common'
import { TypeMapping } from '@_types/mapping/TypeMapping'
import { integer } from '@_types/Numeric'
import { DataStreamLifecycle } from '@indices/_types/DataStreamLifecycle'

/**
 * Creates or updates an index template.
 * Index templates define settings, mappings, and aliases that can be applied automatically to new indices.
 * @rest_spec_name indices.put_index_template
 * @availability stack since=7.9.0 stability=stable
 * @availability serverless stability=stable visibility=public
 */
export interface Request extends RequestBase {
  path_parts: {
    /** Index or template name */
    name: Name
  }
  body: {
    /**
     * Name of the index template to create.
     */
    index_patterns?: Indices
    /**
     * An ordered list of component template names.
     * Component templates are merged in the order specified, meaning that the last component template specified has the highest precedence.
     */
    composed_of?: Name[]
    /**
     * Template to be applied.
     * It may optionally include an `aliases`, `mappings`, or `settings` configuration.
     */
    template?: IndexTemplateMapping
    /**
     * If this object is included, the template is used to create data streams and their backing indices.
     * Supports an empty object.
     * Data streams require a matching index template with a `data_stream` object.
     */
    data_stream?: DataStreamVisibility
    /**
     * Priority to determine index template precedence when a new data stream or index is created.
     * The index template with the highest priority is chosen.
     * If no priority is specified the template is treated as though it is of priority 0 (lowest priority).
     * This number is not automatically generated by Elasticsearch.
     */
    priority?: integer
    /**
     * Version number used to manage index templates externally.
     * This number is not automatically generated by Elasticsearch.
     */
    version?: VersionNumber
    /**
     * Optional user metadata about the index template.
     * May have any contents.
     * This map is not automatically generated by Elasticsearch.
     * @doc_id mapping-meta-field */
    _meta?: Metadata
  }
  query_parameters: {
    /**
     * If `true`, this request cannot replace or update existing index templates.
     * @server_default false
     */
    create?: boolean
  }
}

export class IndexTemplateMapping {
  /**
   * Aliases to add.
   * If the index template includes a `data_stream` object, these are data stream aliases.
   * Otherwise, these are index aliases.
   * Data stream aliases ignore the `index_routing`, `routing`, and `search_routing` options.
   */
  aliases?: Dictionary<IndexName, Alias>
  /**
   * Mapping for fields in the index.
   * If specified, this mapping can include field names, field data types, and mapping parameters.
   */
  mappings?: TypeMapping
  /**
   * Configuration options for the index.
   */
  settings?: IndexSettings
  /**
   * @availability stack since=8.11.0 stability=stable
   * @availability serverless stability=stable
   */
  lifecycle?: DataStreamLifecycle
}
